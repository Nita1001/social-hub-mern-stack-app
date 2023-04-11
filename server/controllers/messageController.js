const Message = require('../models/messageSchema.js');
const User = require('../models/userSchema.js');
const updateMessages = require('../helpers/updateMessages.js');
exports.createMessage = async (body) => {
    const { conversationId, from, to, content } = body;

    if (!conversationId || !from || !to || !content) {
        throw new Error('Missing required fields');
    }

    try {
        const thisMessage = new Message({
            from,
            to,
            content,
            conversationId
        });

        const savedMessage = await thisMessage.save();

        const updatePromises = [
            updateMessages(from, { $push: { messages: savedMessage._id } }),
            updateMessages(to, { $push: { messages: savedMessage._id } })
        ];

        const [updatedFromMessages, updatedToMessages] = await Promise.all(updatePromises);

        console.log('updatedFromMessages', updatedFromMessages);
        console.log('updatedToMessages', updatedToMessages);

        return {
            message: 'Message sent successfully',
            from,
            to,
            content,
            conversationId
        };
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const messages = user.messages;
        res.status(200).json({ messages: messages });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error, did not g et m essa m ge ' });
    }
}

//TODO: socket.io 