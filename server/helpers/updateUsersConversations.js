
const User = require('../models/inventorySchema.js');

const updateUsersConversations = async (userId, update) => {
    try {
        const user = await User.findByIdAndUpdate(userId, update, { new: true });
        const updatedConversations = user.conversations;
        return updatedConversations;
    } catch (error) {
        console.error('Error updating user after creating item');
        throw new Error(error.message);
    }
}

module.exports = updateUsersConversations;