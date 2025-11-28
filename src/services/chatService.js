const openai = require('../config/openai');
const Topic = require('../models/Topic');
const Chunk = require('../models/Chunk');
const Conversation = require('../models/Conversation');
const { generateEmbedding } = require('./embeddingService');
const config = require('../config');
const logger = require('../utils/logger');

function buildSystemPrompt(topic, context) {
  return `You are an English learning assistant for: "${topic.title}"

CONTEXT (use ONLY this information):
"""
${context}
"""

RULES:
1. ONLY answer questions using the context above
2. If asked anything outside the context, respond:
   "I can only help with questions about ${topic.title}. Please ask something related to this topic."
3. Be helpful and use simple English for learners
4. Give examples when explaining grammar
5. Never make up information not in the context`;
}

async function vectorSearch(topicId, query) {
  const queryEmbedding = await generateEmbedding(query);

  const results = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: config.vectorSearch.indexName,
        path: 'embedding',
        queryVector: queryEmbedding,
        numCandidates: config.vectorSearch.numCandidates,
        limit: config.vectorSearch.limit,
        filter: { topic_id: topicId }
      }
    },
    { $project: { content: 1, score: { $meta: 'vectorSearchScore' } } }
  ]);

  return results;
}

async function getConversationHistory(userId, topicId) {
  const conversation = await Conversation.findOne({ user_id: userId, topic_id: topicId, mode: 'chat' });
  if (!conversation) return [];
  return conversation.messages.slice(-config.chat.maxConversationHistory);
}

async function saveConversation(userId, topicId, userMessage, assistantReply) {
  await Conversation.findOneAndUpdate(
    { user_id: userId, topic_id: topicId, mode: 'chat' },
    {
      $push: {
        messages: {
          $each: [
            { role: 'user', type: 'chat', content: userMessage, timestamp: new Date() },
            { role: 'assistant', type: 'chat', content: assistantReply, timestamp: new Date() }
          ]
        }
      },
      $set: { updated_at: new Date(), status: 'in_progress' }
    },
    { upsert: true, new: true }
  );
}

async function processChat(userId, topicId, message) {
  const topic = await Topic.findOne({ topic_id: topicId });
  if (!topic) throw new Error(`Topic ${topicId} not found`);

  const relevantChunks = await vectorSearch(topicId, message);
  const context = relevantChunks.map(c => c.content).join('\n\n---\n\n');
  const history = await getConversationHistory(userId, topicId);

  const messages = [
    { role: 'system', content: buildSystemPrompt(topic, context) },
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message }
  ];

  const completion = await openai.chat.completions.create({
    model: config.openai.model,
    messages,
    max_tokens: config.openai.maxTokens,
    temperature: 0.7
  });

  const reply = completion.choices[0].message.content;
  await saveConversation(userId, topicId, message, reply);

  const conversation = await Conversation.findOne({ user_id: userId, topic_id: topicId, mode: 'chat' });

  return {
    reply,
    conversation_id: conversation._id.toString()
  };
}

async function processChatStream(userId, topicId, message, onChunk, onComplete) {
  const topic = await Topic.findOne({ topic_id: topicId });
  if (!topic) throw new Error(`Topic ${topicId} not found`);

  const relevantChunks = await vectorSearch(topicId, message);
  const context = relevantChunks.map(c => c.content).join('\n\n---\n\n');
  const history = await getConversationHistory(userId, topicId);

  const messages = [
    { role: 'system', content: buildSystemPrompt(topic, context) },
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message }
  ];

  const stream = await openai.chat.completions.create({
    model: config.openai.model,
    messages,
    max_tokens: config.openai.maxTokens,
    temperature: 0.7,
    stream: true
  });

  let fullReply = '';

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    fullReply += content;
    onChunk(content);
  }

  await saveConversation(userId, topicId, message, fullReply);
  const conversation = await Conversation.findOne({ user_id: userId, topic_id: topicId, mode: 'chat' });

  onComplete({
    fullReply,
    conversation_id: conversation._id.toString()
  });
}

module.exports = { processChat, processChatStream };
