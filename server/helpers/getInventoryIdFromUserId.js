const User = require('../models/userSchema.js');

const getInventoryIdFromUserId = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { message: 'User not found' };
        }
        return user.inventoryId;
    } catch (error) {
        console.error(error);
        return { message: 'Something went wrong' };
    }
}

module.exports = getInventoryIdFromUserId;