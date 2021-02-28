const {
    listAllMessages,
    createNewMessage,
    updateMessage,
    deleteMessage,
} = require('../models/message');

exports.index = async (req, res) => {
    const channelId = req.params.channelId;
    const messages = await listAllMessages(channelId);

    return res.status(200).json(messages);
};

exports.create = async (req, res) => {
    const {body} = req; 

    const message = await createNewMessage(body);

    if(! message) {
        return res.status(400).json({
            content: 'Content is required.',
            created_at: 'Created_at is required.',
            channelId: 'Channel_id is required'
        });
    }

    return res.status(201).json(message); 
};

exports.update = async (req, res) => {
    const {body} = req; 
    const messageId = req.params.messageId;

    const message = await updateMessage(messageId, body);

    if(! message) {
        return res.status(400).json({
            content: 'Content is required.',
            created_at: 'Created_at is required.',
            channelId: 'Channel_id is required'
        });
    }

    return res.status(201).json(message); 
};


exports.delete = async (req, res) => {
    return res.status(201).json(await deleteMessage(req.params.messageId));
};
