const Transaction = require('../models/transactionSchema.js');
const checkAndReturnAccount = require('../helpers/checkAndReturnAccount.js');
const saveUpdatedAccount = require('../helpers/saveUpdatedAccount.js');
const updateUserTransactions = require('../helpers/updateUserTransactions.js');
const Account = require('../models/accountSchema.js');

//Deposit cash to user's account
exports.depositCash = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;

        const response = await checkAndReturnAccount(accountId, userId);

        if (response.status !== 200) {
            return res.status(response.status).json({ message: response.message });
        }

        const [updatedAccount, transaction] = await Promise.all([
            saveUpdatedAccount(accountId, { $inc: { balance: amount } }),
            new Transaction({ type: 'deposit', amount, accountId }).save()
        ]);

        await updateUserTransactions(userId, transaction._id);

        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const previousBalance = response.account.balance;

        res.json({ message: 'Cash deposited successfully', account: updatedAccount, previousBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


//Withdraw money from user's account
exports.withdrawMoney = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        const accountCheck = await checkAndReturnAccount(accountId, userId);
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
        await updateUserTransactions(userId, transaction._id);
        res.json({ message: 'Cash withdrawn successfully', account: updatedAccount })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//Update user's credit
exports.updateCredit = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;

        const accountCheck = await checkAndReturnAccount(accountId, userId);
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

//Transfer Money from one user to another
exports.transferMoney = async (req, res) => {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;

        const fromAccount = await checkAndReturnAccount(fromAccountId);
        //Checking for sufficient funds
        const totalBalance = fromAccount.balance + fromAccount.credit;
        if (totalBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const [updatedFromAccount, transaction] = await Promise.all([
            Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } }, { new: true }),
            Transaction.create({ accountId: fromAccountId, toAccountId: toAccountId, amount, type: "transfer" })
        ]);
        const [updatedToAccount] = await Promise.all([
            Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } }, { new: true }),
            Account.findByIdAndUpdate(fromAccountId, { $push: { transactions: transaction } }, { new: true })
        ]);

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

//Get specific users transactions history
exports.getUsersTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await Transaction.find({ userId });
        res.json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};