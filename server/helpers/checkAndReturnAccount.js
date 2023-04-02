const Account = require('../models/accountSchema.js');
const getUserIdFromAccountId = require('./getUserIdFromAccountId.js');

const checkAndReturnAccount = async (accountId, userId) => {
    try {
        if (!userId) {
            userId = await getUserIdFromAccountId(accountId);
        }

        const account = await Account.findById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return { account, status: 200, message: 'Account Exists' };

    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Something went wrong' };
    }
};

module.exports = checkAndReturnAccount;