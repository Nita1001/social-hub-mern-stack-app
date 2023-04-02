const Account = require('../models/accountSchema.js');

exports.createAccount = async (userId) => {
    try {
        const account = new Account(
            {
                userId: userId,
                balance: 0,
                credit: 0
            });
        const savedAccount = await account.save();
        return savedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json(account);
        }
        res.status(200).json(account);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        await account.deleteOne();
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};