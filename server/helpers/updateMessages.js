
const User = require('../models/userSchema.js');

const updateMessages = async (accountId, update) => {
    try {
        const updatedMessages = await User.findByIdAndUpdate(accountId, update, { new: true });
        console.log('3333', updatedMessages);
        return updatedMessages;
    } catch (error) {
        console.error('Error updating user after creating item');
        throw new Error(error.message);
    }
}

module.exports = updateMessages;