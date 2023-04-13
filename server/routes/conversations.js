const express = require('express');
const router = express.Router();
const { createConversation, getConversationByUserId, getUsersConversation, getConversationById } = require('../controllers/conversationController');

// Create a new conversation
router.post('/', createConversation);

// Get all conversations for a user
router.get('/:userId', getConversationByUserId);
// Get conversation by Id
router.get('/users/:conversationId', getConversationById);
// Get conversation between 2 users 
router.get('/:userAId/:userBId', getUsersConversation);

module.exports = router;

// 64370c1783d537a2fff20ba4