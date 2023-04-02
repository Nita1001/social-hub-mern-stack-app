const Account = require('../models/accountSchema.js');

const saveUpdatedAccount = async (accountId, update) => {
    try {
        const updatedAccount = await Account.findOneAndUpdate(
            { _id: accountId },
            update,
            { new: true }
        );
        if (!updatedAccount) {
            return { message: 'Account not found' };
        }
        return updatedAccount;
    } catch (error) {
        console.error(error);
        return { message: 'Something went wrong' };
    }
};
module.exports = saveUpdatedAccount;