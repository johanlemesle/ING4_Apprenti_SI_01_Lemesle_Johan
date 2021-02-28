const {v4: uuid} = require('uuid');
const db = require('../../db_config');

const listAllMessages = async (channelId) => {
    return new Promise((resolve, reject) => {
        const messages = [];

        const options = {
            gt: 'messages:',
            lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
        };

        //https://github.com/Level/level#createReadStream
        db.createReadStream(options)
            .on('data', ({key, value}) => {
                const p = [];
                p.push(JSON.parse(value));
                const tableau = p.map(message => message.channelId);

                for (var i = 0; i < tableau.length; i++) {
                    if(channelId == tableau[i]) {
                        messages.push(JSON.parse(value));
                    }
                }
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', () => {
                resolve(messages);
            });
    })

};


const createNewMessage = body => {
    if(!body.content || !body.created_at || !body.channelId) {
        return null 
    }

    const message = {
        id: uuid(),
        content: body.content,
        created_at: body.created_at,
        channelId: body.channelId
    };

    return new Promise(((resolve, reject) => {
        db.put(`messages:${message.id}`, JSON.stringify(message), (err) => {
            if(err) {
                reject(err);
            }

            resolve(message);
        })
    }));
};

const updateMessage = async (messageId, body) => {
    if(!body.content || !body.created_at || !body.channelId) {
        return null 
    }

    const message = {
        id: messageId,
        content: body.content,
        created_at: body.created_at,
        channelId: body.channelId
    };

    return new Promise(((resolve, reject) => {
        db.put(`messages:${message.id}`, JSON.stringify(message), (err) => {
            if(err) {
                reject(err);
            }

            resolve(message);
        })
    }));
};


const deleteMessage = async messageId => {
    return new Promise(((resolve, reject) => {
        db.del(`messages:${messageId}`, (err) => {
            if (err) {
                reject(err);
            }
            resolve({ message: ` deleted ${messageId} successfully` });
        });
    }));
};

module.exports = {
    listAllMessages,
    createNewMessage,
    updateMessage,
    deleteMessage,
};
