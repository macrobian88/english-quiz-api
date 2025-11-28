const express = require('express');
const router = express.Router();
const { checkConnection } = require('../config/database');

// GET /health - Basic health check
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// GET /health/ready - Readiness check with DB
router.get('/ready', async (req, res) => {
  const dbStatus = checkConnection();

  if (!dbStatus) {
    return res.status(503).json({
      status: 'not ready',
      database: 'disconnected',
      timestamp: new Date().toISOString()
    });
  }

  res.json({
    status: 'ready',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
