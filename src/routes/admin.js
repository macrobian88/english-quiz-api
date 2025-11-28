const express = require('express');
const router = express.Router();
const { createTopic, listTopics, getTopic, updateTopic, deleteTopic, bulkUpload } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const { validate } = require('../middleware/validateRequest');
const { adminLimiter } = require('../middleware/rateLimiter');

router.use(adminAuth);
router.use(adminLimiter);

// POST /api/admin/topics - Create topic
router.post('/topics', validate('createTopic'), createTopic);

// GET /api/admin/topics - List topics
router.get('/topics', validate('pagination', 'query'), listTopics);

// GET /api/admin/topics/:topic_id - Get topic
router.get('/topics/:topic_id', getTopic);

// PUT /api/admin/topics/:topic_id - Update topic
router.put('/topics/:topic_id', validate('updateTopic'), updateTopic);

// DELETE /api/admin/topics/:topic_id - Delete topic
router.delete('/topics/:topic_id', deleteTopic);

// POST /api/admin/topics/bulk - Bulk upload
router.post('/topics/bulk', validate('bulkUpload'), bulkUpload);

module.exports = router;
