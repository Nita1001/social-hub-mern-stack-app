const Account = require('../models/accountSchema.js');
const getUserIdFromAccountId = require('../middleware/getUserIdFromAccountId.js');

const checkAccountExists = async (accountId, userId) => {
    try {
        // If userId is not provided, get it from the account ID
        if (!userId) {
            userId = await getUserIdFromAccountId(accountId);
        }

        const account = await Account.findOne({ _id: accountId, userId: userId });
        if (!account) {
            return { status: 404, message: 'Account not found' };
        }
        return { status: 200, message: 'Account exists', account };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Something went wrong' };
    }
};

module.exports = checkAccountExists;