const express = require('express');
const router = express.Router();
const { createConversation, getConversationByUserId, getUsersConversation } = require('../controllers/conversationController');

// Create a new conversation
router.post('/', createConversation);

// Get all conversations for a user
router.get('/:userId', getConversationByUserId);

// Get conversation between 2 users 
router.get('/:user1Id/:user2Id', getUsersConversation);

module.exports = router;