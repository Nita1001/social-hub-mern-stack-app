const Transaction = require('../models/transactionSchema.js');
const createTransaction = require('../middleware/createTransaction.js');
const checkAccountExists = require('../middleware/checkAccountExists.js');
const saveUpdatedAccount = require('../middleware/saveUpdatedAccount.js');

// Deposit cash to user's account
exports.depositCash = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;

        const error = await checkAccountExists(accountId, userId);

        if (error && error.status === 404) {
            return res.status(error.status).json({ message: error.message });
        }

        const { account } = error;

        const updatedAccount = await saveUpdatedAccount(accountId, { $inc: { balance: amount } });

        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const transaction = new Transaction({
            type: 'deposit',
            amount,
            accountId
        });

        await transaction.save();
        const previousBalance = account.balance;
        res.json({ message: 'Cash deposited successfully', account: updatedAccount, previousBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


// Withdraw money from user's account
exports.withdrawMoney = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        const accountCheck = await checkAccountExists(accountId, userId);
        if (accountCheck.status !== 200) {
            return res.status(accountCheck.status).json({ message: accountCheck.message });
        }
        const account = accountCheck.account;

        if (account.balance + account.credit < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        const newBalance = account.balance - amount;
        const updatedAccount = await saveUpdatedAccount(accountId, { balance: newBalance });
        const transaction = new Transaction({
            type: 'withdrawal',
            amount,
            accountId
        });
        await transaction.save();
        res.json({ message: 'Cash withdrawn successfully', account: updatedAccount })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update user's credit
exports.updateCredit = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;

        const accountCheck = await checkAccountExists(accountId, userId);
        if (accountCheck.status !== 200) {
            return res.status(accountCheck.status).json({ message: accountCheck.message });
        }

        const updatedAccount = await saveUpdatedAccount(accountId, { $inc: { credit: amount } });
        if (!updatedAccount) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Credit updated successfully', account: updatedAccount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.transferMoney = async (req, res) => {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;

        // Checking if the fromAccount exists
        const fromAccountExists = await checkAccountExists(fromAccountId);
        if (fromAccountExists.status !== 200) {
            return res.status(fromAccountExists.status).json({ message: fromAccountExists.message });
        }

        // Checking if the toAccount exists
        const toAccountExists = await checkAccountExists(toAccountId);
        if (toAccountExists.status !== 200) {
            return res.status(toAccountExists.status).json({ message: toAccountExists.message });
        }

        // Checking for sufficient funds in the fromAccount
        const fromAccount = fromAccountExists.account;
        const totalBalance = fromAccount.balance + fromAccount.credit;
        if (totalBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Updating fromAccount balance
        const updatedFromAccount = await saveUpdatedAccount(fromAccountId, { $inc: { balance: -amount } });
        if (!updatedFromAccount) {
            return res.status(500).json({ message: 'Something went wrong' });
        }

        // Creating a transaction record
        const transaction = await createTransaction(fromAccountId, toAccountId, amount);

        // Updating toAccount balance and transaction records
        const [updatedToAccount, updatedFromAccountWithTransaction] = await Promise.all([
            saveUpdatedAccount(toAccountId, { $inc: { balance: amount } }),
            saveUpdatedAccount(fromAccountId, { $push: { transactions: { _id: transaction.id, to: toAccountId, amount } } })
        ]);

        if (!updatedToAccount || !updatedFromAccountWithTransaction) {
            return res.status(500).json({ message: 'Something went wrong' });
        }

        res.json({
            message: 'Transfer completed successfully',
            fromAccount: fromAccountId,
            toAccount: toAccountId,
            amount: amount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getUsersTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Get all transactions for the user
        const transactions = await Transaction.find({ userId });

        res.json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};