const Message = require('../models/messageSchema.js');
const User = require('../models/userSchema.js');
const updateMessages = require('../helpers/updateMessages.js');

exports.createMessage = async (req, res) => {
    try {
        const { from, to, content } = req.body;

        const message = new Message({
            from,
            to,
            content
        });
        const savedMessage = await message.save();
        const updatedFromMessages = await updateMessages(from, { $push: { messages: savedMessage._id } });
        const updatedToMessages = await updateMessages(to, { $push: { messages: savedMessage._id } });
        console.log('updatedFromMessages', updatedFromMessages);
        console.log('updatedToMessages', updatedToMessages);
        res.json({
            message: 'Message sent successfully',
            from: from,
            to: to,
            content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getMessages = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const messages = user.messages;
        res.status(200).json({ messages: messages });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}