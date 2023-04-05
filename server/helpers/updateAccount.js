const Account = require('../models/accountSchema.js');

const updateAccount = async (accountId, update) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(accountId, update, { new: true });
        return updatedAccount;
    } catch (error) {
        console.log('Error updating account after transaction');
        throw new Error(error.message);
    }
}
module.exports = updateAccount;


