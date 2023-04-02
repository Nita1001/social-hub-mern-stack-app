const Account = require('../models/accountSchema.js');

const saveUpdatedAccount = async (accountId, update) => {
    try {
        const updatedAccount = await Account
            .findByIdAndUpdate(accountId, update, { new: true }).lean();
        if (!updatedAccount) {
            return null;
        }
        return updatedAccount;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong111');
    }
};
module.exports = saveUpdatedAccount;