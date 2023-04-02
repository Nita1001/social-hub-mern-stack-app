const Account = require('../models/accountSchema.js');

const getUserIdFromAccountId = async (accountId) => {
    try {
        const account = await Account.findById(accountId);
        if (!account) {
            return { message: 'Account not found' };;
        }
        return account.userId;
    } catch (error) {
        console.error(error);
        return { message: 'Something went wrong' };
    }
};

module.exports = getUserIdFromAccountId;