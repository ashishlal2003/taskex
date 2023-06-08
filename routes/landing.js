const express = require('express');
const router = express.Router();
const controller = require('../controllers/landing');

// Handle TaskEx ID form submission
router.post('/', controller.submitTaskExID);

// Handle new TaskEx ID form submission
router.post('/new', controller.createTaskExID);

module.exports = router;
