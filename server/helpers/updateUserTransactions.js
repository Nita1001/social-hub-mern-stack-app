const Transaction = require('../models/transactionSchema');

async function updateUserTransactions(fromAccountId, toAccountId, transactionId) {
    try {
        await Transaction.updateOne(
            { accountId: fromAccountId },
            { $push: { transactions: { _id: transactionId, to: toAccountId } } }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong');
    }

    try {
        await Transaction.updateOne(
            { accountId: toAccountId },
            { $push: { transactions: { _id: transactionId, from: fromAccountId } } }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong');
    }
}

module.exports = updateUserTransactions;