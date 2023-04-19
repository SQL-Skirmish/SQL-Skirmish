const express = require('express');
const router = express.Router();

const promptController = require('../controllers/promptController');

// GET a prompt
router.get('/one', promptController.getOnePrompt, 
  (req, res) => res.status(200).json(res.locals)
);

// CHECK for query entered
router.post('/check', promptController.checkPrompt, 
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;