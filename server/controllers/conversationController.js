const Conversation = require('../models/conversationSchema.js');
const { updateUsersConversations } = require('../helpers/updateUsersConversations.js');
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
    const userAId = req.params.userAId;
    const userBId = req.params.userBId;
    console.log('userAId and userBId', userAId, userBId);
    try {
        const conversation = await Conversation.findOne({
            users: { $all: [userAId, userBId] },
        });
        res.status(200).json(conversation);
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
        const { userAId, userBId } = req.body;
        const conversation = new Conversation({
            users: [userAId, userBId]
        });
        const savedConversation = await conversation.save();
        await updateUsersConversations(userAId, { $push: { conversations: savedConversation } });
        await updateUsersConversations(userBId, { $push: { conversations: savedConversation } });
        // console.log('889299992893218908301', updatedUserAConversations);
        // console.log('889299992893218908301', updatedUserBConversations);

        res.status(201).json(savedConversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create conversation', error: err.message });
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
