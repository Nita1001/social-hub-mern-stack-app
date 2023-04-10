const Conversation = require('../models/conversationSchema.js');

// Get conversations
exports.getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find().populate('users', 'username');
        res.status(200).json(conversations);
    } catch (err) {
        next(err);
    }
};

// Get conversation by id
exports.getConversationByUserId = async (req, res, next) => {
    try {
        const conversation = await Conversation.findById(req.params.id).populate('users', 'username');
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (err) {
        next(err);
    }
};

// Create new conversation
exports.createConversation = async (req, res, next) => {
    try {
        const { users } = req.body;
        const conversation = await Conversation.create({ users });
        res.status(201).json(conversation);
    } catch (err) {
        next(err);
    }
};

// Delete conversation by id
exports.deleteConversationById = async (req, res, next) => {
    try {
        const conversation = await Conversation.findByIdAndDelete(req.params.id);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json({ message: 'Conversation deleted' });
    } catch (err) {
        next(err);
    }
};