const checkAndReturnAccount = require('../helpers/checkAndReturnAccount.js');
const updateAccount = require('../helpers/updateAccount.js');
const createTransaction = require('../helpers/createTransaction.js');
const Account = require('../models/accountSchema.js');

exports.depositCash = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        if (!userId || !accountId || !amount) {
            return res.status(400).json({ message: 'Missing fields in request body' });
        }
        const account = await checkAndReturnAccount(accountId);
        const previousBalance = account.balance;
        const transaction = await createTransaction('deposit', amount, accountId);
        const updatedAccount = await updateAccount(accountId, { $inc: { balance: amount }, $push: { transactions: transaction._id } });

        res.json({
            message: 'Cash deposited successfully',
            account: updatedAccount,
            previousBalance: previousBalance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.withdrawMoney = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        if (!userId || !accountId || !amount) {
            return res.status(400).json({ message: 'Missing fields in request body' });
        }
        const account = await checkAndReturnAccount(accountId);

        if (account.balance + account.credit < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const transaction = await createTransaction('withdrawal', amount, accountId);
        const updatedAccount = await updateAccount(accountId, { $inc: { balance: -amount }, $push: { transactions: transaction._id } });

        res.json({ message: 'Cash withdrawn successfully', account: updatedAccount, previousBalance: account.balance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//Update user's credit
exports.updateCredit = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        if (!userId || !accountId || !amount) {
            return res.status(400).json({ message: 'Missing fields in request body' });
        }
        const account = await checkAndReturnAccount(accountId);
        const transaction = await createTransaction('credit', amount, accountId);
        const updatedAccount = await updateAccount(accountId, { $inc: { credit: amount }, $push: { transactions: transaction._id } });

        res.json({ message: 'Credit updated successfully', account: updatedAccount, previousCredit: account.credit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//Transfer Money from one user to another
exports.transferMoney = async (req, res) => {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;
        if (!fromAccountId || !toAccountId || !amount) {
            return res.status(400).json({ message: 'Missing fields in request body' });
        }
        const fromAccount = await checkAndReturnAccount(fromAccountId);
        //Checking for sufficient funds
        const totalBalance = fromAccount.balance + fromAccount.credit;
        if (totalBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const transaction = await createTransaction('transfer', amount, fromAccountId, toAccountId);
        const updatedFromAccount = await updateAccount(fromAccountId, { $inc: { balance: -amount }, $push: { transactions: transaction._id } });
        const updatedToAccount = await updateAccount(toAccountId, { $inc: { balance: amount }, $push: { transactions: transaction._id } });

        res.json({
            message: 'Transfer completed successfully',
            fromAccount: updatedFromAccount,
            toAccount: updatedToAccount,
            amount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get specific user's transactions history
exports.getUsersTransactions = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const account = await Account.findById(accountId);
        const transactions = account.transactions;
        res.json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};