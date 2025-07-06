const express = require('express');

const router = express.Router();

// Basic endpoint for testing API connectivity
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

// Placeholder endpoint for future calculator operations
router.post('/calculate', (req, res) => {
  const { operation, numbers } = req.body;
  
  if (!operation || !numbers) {
    return res.status(400).json({ error: 'Operation and numbers are required' });
  }
  
  // Currently, just acknowledge receipt; logic will be implemented later
  res.status(200).json({ 
    message: 'Calculation request received',
    operation,
    numbers,
    result: null // Placeholder for future implementation
  });
});

// Placeholder endpoint for logging operations (for future use)
router.post('/log', (req, res) => {
  const { operation, numbers, result } = req.body;
  
  if (!operation || !numbers || result === undefined) {
    return res.status(400).json({ error: 'Operation, numbers, and result are required for logging' });
  }
  
  // Currently, just acknowledge receipt; database logging will be implemented later
  res.status(200).json({ 
    message: 'Log entry received',
    operation,
    numbers,
    result
  });
});

module.exports = router;
