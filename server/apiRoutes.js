const express = require('express');

const router = express.Router();

// Basic hello endpoint for testing
router.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from API!' });
});

// Status endpoint to check server health
router.get('/status', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Future endpoint for calculator operations
router.post('/calculate', (req, res) => {
  const { operation, numbers } = req.body;
  
  if (!operation || !numbers) {
    return res.status(400).json({ error: 'Operation and numbers are required' });
  }
  
  // Placeholder for future server-side calculations or logging
  res.status(200).json({ 
    message: 'Calculation request received',
    operation,
    numbers,
    result: 'To be implemented on server side'
  });
});

module.exports = router;
