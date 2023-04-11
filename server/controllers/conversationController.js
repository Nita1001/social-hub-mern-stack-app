const Conversation = require('../models/conversationSchema.js');

// Get conversations
exports.getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find().populate('users', '_id');
        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get conversations' });
    }
};

// Get conversation between 2 users 
exports.getUsersConversation = async (req, res) => {
    const { userAId, userBId } = req.params;
    try {
        const conversation = await Conversation.findOne({
            users: { $all: [userAId, userBId] },
        });
        if (conversation) {
            res.send(conversation);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to get conversation between users' });
    }
};

// Get conversation by user id
exports.getConversationByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ users: userId }).populate('users', '_id');
        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get conversation by user ID' });
    }
};

// Create new conversation
exports.createConversation = async (req, res) => {
    try {
        const { users } = req.body;
        const conversation = new Conversation({ users });
        const savedConversation = await conversation.save();
        res.status(201).json(savedConversation);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create conversation' });
    }
};

// Delete conversation by id
exports.deleteConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndDelete(req.params.id);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json({ message: 'Conversation deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete conversation' });
    }
};


    // Create new conversation
    // exports.createConversation = async (req, res, next) => {
    //     try {
    //         const { userA, userB } = req.body;
    //         const conversation = new Conversation(
    //             { users: [userA._id, userB._id] }
    //         );
    //         const savedConversation = await conversation.save();
    //         res.status(201).json(savedConversation);
    //     } catch (err) {
    //         next(err);
    //     }
    // };