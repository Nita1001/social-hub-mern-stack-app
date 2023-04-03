const Transaction = require('../models/transactionSchema');

const updateUserTransactions = async (fromAccountId, toAccountId, transactionId) => {
    if (fromAccountId === toAccountId) {
        try {
            await Transaction.updateOne(
                { accountId: toAccountId },
                { $push: { transactions: { _id: transactionId, from: fromAccountId } } }
            );
        } catch (error) {
            console.error(error);
            throw new Error('Something went wrong');
        }

    } else {
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
}

module.exports = updateUserTransactions;