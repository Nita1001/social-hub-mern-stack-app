const User = require('../models/userSchema.js');
const Account = require('../models/accountSchema.js');
const Inventory = require('../models/inventorySchema.js');

const { createAccount } = require('./accountController.js');
const { createInv } = require('./inventoryController.js');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const matchedUser = await User.findOne({ email, password });
        if (!matchedUser) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        res.status(200).json({ message: 'Login successful', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });

    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createUser = async (req, res) => {
    const { firstName, lastName, email, phone, password, username } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !username) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User Already Exists' });
        }
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            phone,
        });
        const savedUser = await user.save();
        // creating account and Inventory for the user
        const account = await createAccount(savedUser.id);
        const inventory = await createInv(savedUser.id);
        // setting account and inventory properties of the user to the new account
        savedUser.accountId = account;
        savedUser.inventoryId = inventory;
        // saving updated user
        await savedUser.save();

        res.status(201).json({ message: 'User created successfully', savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // deleting associated account
        await Account.deleteOne({ _id: user.accountId });
        // deleting associated inventory
        await Inventory.deleteOne({ _id: user.inventoryId });
        // deleting user
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};