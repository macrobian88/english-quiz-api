const Topic = require('../models/Topic');
const { processTopicFiles, updateTopicFiles, deleteTopic } = require('../services/chunkingService');
const logger = require('../utils/logger');

async function createTopic(req, res, next) {
  try {
    const { topic_id, title, files, metadata } = req.body;
    logger.info(`Creating topic: ${topic_id}`);
    const result = await processTopicFiles(topic_id, title, files, metadata);
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

async function listTopics(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const [topics, total] = await Promise.all([
      Topic.find().sort({ created_at: -1 }).skip(skip).limit(parseInt(limit)),
      Topic.countDocuments()
    ]);

    res.json({
      success: true,
      data: topics,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getTopic(req, res, next) {
  try {
    const { topic_id } = req.params;
    const topic = await Topic.findOne({ topic_id });

    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }

    res.json({ success: true, topic });
  } catch (error) {
    next(error);
  }
}

async function updateTopic(req, res, next) {
  try {
    const { topic_id } = req.params;
    const { title, files, metadata } = req.body;
    logger.info(`Updating topic: ${topic_id}`);
    const result = await updateTopicFiles(topic_id, title, files, metadata);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

async function deleteTopicHandler(req, res, next) {
  try {
    const { topic_id } = req.params;
    logger.info(`Deleting topic: ${topic_id}`);
    const result = await deleteTopic(topic_id);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

async function bulkUpload(req, res, next) {
  try {
    const { topics } = req.body;
    const results = [];

    for (const topic of topics) {
      try {
        const result = await processTopicFiles(topic.topic_id, topic.title, topic.files, topic.metadata);
        results.push({ topic_id: topic.topic_id, success: true, ...result });
      } catch (error) {
        results.push({ topic_id: topic.topic_id, success: false, error: error.message });
      }
    }

    const successful = results.filter(r => r.success).length;
    res.json({
      success: true,
      summary: { total: topics.length, successful, failed: topics.length - successful },
      results
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createTopic, listTopics, getTopic, updateTopic, deleteTopic: deleteTopicHandler, bulkUpload };
