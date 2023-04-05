const Transaction = require('../models/transactionSchema.js');

const createTransaction = async (type, amount, fromAccountId, toAccountId = fromAccountId) => {
    try {
        const transaction = new Transaction({
            type,
            amount,
            accountId: fromAccountId,
            toAccountId
        });
        const savedTransaction = await transaction.save();
        return savedTransaction;

    } catch (error) {
        console.log('Error creating transaction: ');
        throw new Error(error.message);
    }
}
module.exports = createTransaction;