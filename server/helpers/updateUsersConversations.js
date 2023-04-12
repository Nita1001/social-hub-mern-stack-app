
const User = require('../models/userSchema.js');

exports.updateUsersConversations = async (userId, update) => {
    try {
        const user = await User.findByIdAndUpdate(userId, update, { new: true });
        const updatedConversations = user.conversations;
        return updatedConversations;
    } catch (error) {
        console.error(`Error updating User, user not found with id ${userId}`);
        throw new Error(error.message);
    }
}

