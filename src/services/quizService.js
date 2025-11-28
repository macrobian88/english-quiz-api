const openai = require('../config/openai');
const Topic = require('../models/Topic');
const Chunk = require('../models/Chunk');
const Conversation = require('../models/Conversation');
const { generateEmbedding } = require('./embeddingService');
const config = require('../config');
const logger = require('../utils/logger');

const MAX_SCORE = config.quiz.maxScorePerQuestion;

function buildQuestionPrompt(topic, context, questionNumber, totalQuestions, previousQuestions) {
  const prevQuestionsText = previousQuestions.length > 0
    ? `\n\nPREVIOUS QUESTIONS (do not repeat):\n${previousQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
    : '';

  return `You are an English learning quiz master for: "${topic.title}"

LESSON CONTENT:
"""
${context}
"""
${prevQuestionsText}

Question ${questionNumber} of ${totalQuestions}.

RULES:
1. Create a question testing the lesson content
2. Mix types: fill-in-blank, correct/incorrect, transformation
3. Keep questions clear and appropriate for English learners
4. For fill-in-blank use: "I ___ (verb) already."
5. DO NOT repeat previous questions

Respond with ONLY the question text.`;
}

function buildEvaluationPrompt(topic, context, question, userAnswer, maxScore) {
  return `You are an English learning evaluator for: "${topic.title}"

LESSON CONTENT:
"""
${context}
"""

QUESTION: "${question}"
STUDENT'S ANSWER: "${userAnswer}"

Evaluate and respond in this EXACT JSON format:
{
  "score": <0-${maxScore}>,
  "is_correct": <boolean>,
  "feedback": {
    "summary": "<one line: Perfect!, Great!, Good try!, etc.>",
    "explanation": "<why the answer is correct/incorrect>",
    "correct_answer": "<correct answer if wrong, null if correct>",
    "grammar_tip": "<relevant grammar tip>",
    "example": "<example sentence>"
  }
}

SCORING (0-${maxScore}):
- ${maxScore}: Perfect
- ${maxScore-1}: Minor issues
- ${Math.floor(maxScore/2)+1}-${maxScore-2}: Partially correct
- 1-${Math.floor(maxScore/2)}: Mostly incorrect
- 0: Completely wrong

Be encouraging. Respond with ONLY JSON.`;
}

async function vectorSearch(topicId, query) {
  const queryEmbedding = await generateEmbedding(query || 'english lesson');

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
    { $project: { content: 1, file_name: 1, score: { $meta: 'vectorSearchScore' } } }
  ]);

  return results;
}

function getPreviousQuestions(messages) {
  return messages
    .filter(m => m.role === 'assistant' && m.type === 'question')
    .map(m => m.content);
}

async function generateQuestion(topic, context, questionNumber, totalQuestions, previousQuestions) {
  const messages = [
    { role: 'system', content: buildQuestionPrompt(topic, context, questionNumber, totalQuestions, previousQuestions) },
    { role: 'user', content: 'Generate the next question.' }
  ];

  const completion = await openai.chat.completions.create({
    model: config.openai.model,
    messages,
    max_tokens: 200,
    temperature: 0.8
  });

  return completion.choices[0].message.content.trim();
}

async function evaluateAnswer(topic, context, question, userAnswer) {
  const messages = [
    { role: 'system', content: buildEvaluationPrompt(topic, context, question, userAnswer, MAX_SCORE) },
    { role: 'user', content: 'Evaluate this answer.' }
  ];

  const completion = await openai.chat.completions.create({
    model: config.openai.model,
    messages,
    max_tokens: 400,
    temperature: 0.3
  });

  try {
    const cleaned = completion.choices[0].message.content.trim()
      .replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    logger.error('Failed to parse evaluation:', error);
    return {
      score: Math.floor(MAX_SCORE / 2),
      is_correct: false,
      feedback: {
        summary: 'Thanks for your answer!',
        explanation: 'Let\'s continue.',
        correct_answer: null,
        grammar_tip: 'Keep practicing!',
        example: null
      }
    };
  }
}

function buildFeedbackMessage(evaluation) {
  const fb = evaluation.feedback;
  let msg = `${fb.summary}\n\nScore: ${evaluation.score}/${MAX_SCORE}\n\n${fb.explanation}`;
  if (fb.correct_answer) msg += `\n\nCorrect answer: ${fb.correct_answer}`;
  if (fb.grammar_tip) msg += `\n\nTip: ${fb.grammar_tip}`;
  if (fb.example) msg += `\n\nExample: "${fb.example}"`;
  return msg;
}

function getGrade(percentage) {
  if (percentage >= 90) return { grade: 'A', label: 'Excellent!' };
  if (percentage >= 80) return { grade: 'B', label: 'Great job!' };
  if (percentage >= 70) return { grade: 'C', label: 'Good work!' };
  if (percentage >= 60) return { grade: 'D', label: 'Keep practicing!' };
  return { grade: 'F', label: 'More practice needed' };
}

function generateFinalSummary(conversation) {
  const percentage = Math.round((conversation.total_score / conversation.max_possible_score) * 100);
  const gradeInfo = getGrade(percentage);
  
  const evaluations = conversation.messages.filter(m => m.type === 'evaluation');
  const perfectAnswers = evaluations.filter(e => e.score === MAX_SCORE).length;
  const goodAnswers = evaluations.filter(e => e.score >= MAX_SCORE - 1).length - perfectAnswers;

  return {
    total_score: conversation.total_score,
    max_possible_score: conversation.max_possible_score,
    percentage,
    grade: gradeInfo.grade,
    grade_label: gradeInfo.label,
    performance: { perfect_answers: perfectAnswers, good_answers: goodAnswers, total_questions: conversation.total_questions }
  };
}

async function startQuiz(userId, topicId, totalQuestions) {
  const topic = await Topic.findOne({ topic_id: topicId });
  if (!topic) throw new Error(`Topic ${topicId} not found`);

  const relevantChunks = await vectorSearch(topicId, topic.title);
  const context = relevantChunks.map(c => c.content).join('\n\n---\n\n');
  if (!context) throw new Error('No content found for this topic');

  let conversation = await Conversation.findOne({ user_id: userId, topic_id: topicId, mode: 'quiz' });
  
  if (conversation) {
    conversation.current_question = 1;
    conversation.total_questions = totalQuestions;
    conversation.total_score = 0;
    conversation.max_possible_score = 0;
    conversation.status = 'in_progress';
    conversation.messages = [];
  } else {
    conversation = new Conversation({
      user_id: userId,
      topic_id: topicId,
      mode: 'quiz',
      current_question: 1,
      total_questions: totalQuestions,
      total_score: 0,
      max_possible_score: 0,
      status: 'in_progress',
      messages: []
    });
  }

  const question = await generateQuestion(topic, context, 1, totalQuestions, []);

  conversation.messages.push({
    role: 'assistant',
    type: 'question',
    question_number: 1,
    content: question,
    timestamp: new Date()
  });

  await conversation.save();
  logger.info(`Quiz started: user=${userId}, topic=${topicId}`);

  return {
    session_id: conversation._id.toString(),
    topic_id: topicId,
    topic_title: topic.title,
    question_number: 1,
    total_questions: totalQuestions,
    question,
    status: 'in_progress'
  };
}

async function submitAnswer(userId, topicId, userAnswer) {
  const topic = await Topic.findOne({ topic_id: topicId });
  if (!topic) throw new Error(`Topic ${topicId} not found`);

  const conversation = await Conversation.findOne({ user_id: userId, topic_id: topicId, mode: 'quiz' });
  if (!conversation) throw new Error('No active quiz. Start a new quiz.');
  if (conversation.status === 'completed') throw new Error('Quiz completed. Start a new quiz.');
  if (conversation.status === 'not_started') throw new Error('Quiz not started.');

  const lastQuestion = conversation.messages.filter(m => m.type === 'question').pop();
  if (!lastQuestion) throw new Error('No question to answer.');

  const relevantChunks = await vectorSearch(topicId, lastQuestion.content);
  const context = relevantChunks.map(c => c.content).join('\n\n---\n\n');

  conversation.messages.push({
    role: 'user',
    type: 'answer',
    content: userAnswer,
    question_number: conversation.current_question,
    timestamp: new Date()
  });

  const evaluation = await evaluateAnswer(topic, context, lastQuestion.content, userAnswer);
  const feedbackMessage = buildFeedbackMessage(evaluation);

  conversation.messages.push({
    role: 'assistant',
    type: 'evaluation',
    question_number: conversation.current_question,
    content: feedbackMessage,
    score: evaluation.score,
    max_score: MAX_SCORE,
    is_correct: evaluation.is_correct,
    feedback: evaluation.feedback,
    timestamp: new Date()
  });

  conversation.total_score += evaluation.score;
  conversation.max_possible_score += MAX_SCORE;

  if (conversation.current_question >= conversation.total_questions) {
    conversation.status = 'completed';
    await conversation.save();

    return {
      session_id: conversation._id.toString(),
      topic_id: topicId,
      topic_title: topic.title,
      question_number: conversation.current_question,
      total_questions: conversation.total_questions,
      your_answer: userAnswer,
      evaluation: { score: evaluation.score, max_score: MAX_SCORE, is_correct: evaluation.is_correct, feedback: evaluation.feedback, feedback_message: feedbackMessage },
      status: 'completed',
      final_results: generateFinalSummary(conversation)
    };
  }

  conversation.current_question += 1;
  const previousQuestions = getPreviousQuestions(conversation.messages);
  const nextQuestion = await generateQuestion(topic, context, conversation.current_question, conversation.total_questions, previousQuestions);

  conversation.messages.push({
    role: 'assistant',
    type: 'question',
    question_number: conversation.current_question,
    content: nextQuestion,
    timestamp: new Date()
  });

  await conversation.save();

  return {
    session_id: conversation._id.toString(),
    topic_id: topicId,
    topic_title: topic.title,
    question_number: conversation.current_question,
    total_questions: conversation.total_questions,
    your_answer: userAnswer,
    evaluation: { score: evaluation.score, max_score: MAX_SCORE, is_correct: evaluation.is_correct, feedback: evaluation.feedback, feedback_message: feedbackMessage },
    next_question: nextQuestion,
    progress: {
      current_score: conversation.total_score,
      max_possible_score: conversation.max_possible_score,
      percentage: Math.round((conversation.total_score / conversation.max_possible_score) * 100)
    },
    status: 'in_progress'
  };
}

async function getQuizStatus(userId, topicId) {
  const conversation = await Conversation.findOne({ user_id: userId, topic_id: topicId, mode: 'quiz' });
  
  if (!conversation) return { status: 'not_started', message: 'No quiz found. Start a new quiz.' };

  const topic = await Topic.findOne({ topic_id: topicId });
  const percentage = conversation.max_possible_score > 0
    ? Math.round((conversation.total_score / conversation.max_possible_score) * 100) : 0;

  const response = {
    session_id: conversation._id.toString(),
    topic_id: topicId,
    topic_title: topic?.title || 'Unknown',
    status: conversation.status,
    current_question: conversation.current_question,
    total_questions: conversation.total_questions,
    progress: { total_score: conversation.total_score, max_possible_score: conversation.max_possible_score, percentage }
  };

  if (conversation.status === 'completed') {
    response.final_results = generateFinalSummary(conversation);
  }

  response.history = conversation.messages;
  return response;
}

async function submitAnswerStream(userId, topicId, userAnswer, onChunk, onComplete) {
  const result = await submitAnswer(userId, topicId, userAnswer);
  
  const feedbackMsg = result.evaluation.feedback_message;
  for (const char of feedbackMsg) {
    onChunk(char);
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  onComplete(result);
}

module.exports = { startQuiz, submitAnswer, submitAnswerStream, getQuizStatus };
