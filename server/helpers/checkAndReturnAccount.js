const Account = require('../models/accountSchema.js');

const checkAndReturnAccount = async (accountId) => {
    try {

        const account = await Account.findById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return account;

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = checkAndReturnAccount;