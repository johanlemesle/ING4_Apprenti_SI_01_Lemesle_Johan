const {
    listAllUsers,
    createNewUser,
    showUser,
    updateUser,
    deleteUser,
} = require('../models/user');

exports.index = async (req, res) => {
    const users = await listAllUsers();

    return res.status(200).json(users);
};

exports.create = async (req, res) => {
    const {body} = req; //on destructure req pour récuperer le body

    const user = await createNewUser(body);

    if(! user) {
        return res.status(400).json({
            name: 'Name is required.'
        });
    }

    return res.status(201).json(user); //Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
};

exports.show = async (req, res) => {
    const userId = req.params.userId;

    const user = await showUser(userId);

    return res.status(200).json(user); //je n'ai pas blindé volontairement user, à vous de le faire ;)
};

exports.update = async (req, res) => {
    const userId = req.params.userId;

    const user = await updateUser(userId, req.body);

    if (!user) {
        return res.status(400).json({
            name: 'Name is required.'
        });
    }
    return res.status(200).json(user);
};


exports.delete = async (req, res) => {
    return res.status(201).json(await deleteUser(req.params.userId));
};
