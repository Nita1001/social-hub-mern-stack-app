
const Conversation = require('../models/conversationSchema.js');

const updateMessages = async (conversationId, update) => {
    try {
        console.log('conversationId, update', conversationId, update);
        const updatedConversation = await Conversation.findByIdAndUpdate(conversationId, update, { new: true });
        console.log('updatedConversation', updatedConversation);
        return updatedConversation;
    } catch (error) {
        console.error('Error updating user after creating item');
        throw new Error(error.message);
    }
}

module.exports = updateMessages;

