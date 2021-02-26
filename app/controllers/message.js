const {
    listAllMessages,
    createNewMessage,
    showMessage,
    updateMessage,
    deleteMessage,
} = require('../models/message');

exports.index = async (req, res) => {
    const messages = await listAllMessages();

    return res.status(200).json(messages);
};

exports.create = async (req, res) => {
    const {body} = req; //on destructure req pour récuperer le body

    const message = await createNewMessage(body);

    if(! message) {
        return res.status(400).json({
            content: 'Content is required.'
        });
    }

    return res.status(201).json(message); //Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
};

exports.show = async (req, res) => {
    const messageId = req.params.messageId;

    const message = await showMessage(messageId);

    return res.status(200).json(message); //je n'ai pas blindé volontairement message, à vous de le faire ;)
};

exports.update = async (req, res) => {
    const messageId = req.params.messageId;

    const message = await updateMessage(messageId, req.body);

    if (!message) {
        return res.status(400).json({
            content: 'Content is required.'
        });
    }
    return res.status(201).json(message);
};


exports.delete = async (req, res) => {
    return res.status(201).json(await deleteMessage(req.params.messageId));
};
