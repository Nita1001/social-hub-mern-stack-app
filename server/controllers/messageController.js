const Message = require('../models/messageSchema.js');
const User = require('../models/userSchema.js');
const updateMessages = require('../helpers/updateMessages.js');

exports.createMessage = async (body) => {
    const { conversationId, from, to, content } = body.message;

    if (!conversationId || !from || !to || !content) {
        console.log('body', body);
        throw new Error('Missing required fields');
    }

    try {
        const thisMessage = new Message({
            from,
            to,
            content,
            conversationId
        });
        const savedMessage = await thisMessage.save();
        const conversationUpdate = { $push: { messages: savedMessage.id } };

        const updatedConversation = await updateMessages(conversationId, conversationUpdate);
        const updatedMessages = updatedConversation.messages;
        return {
            message: 'Message sent successfully',
            from,
            to,
            content,
            conversationId
        };
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const messages = user.messages;
        res.status(200).json({ messages: messages });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error, did not get message' });
    }
}


exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        res.status(200).json({ message: message });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server Error getting messages By Id' })
    }
}