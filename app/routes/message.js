const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.get('/:channelId', messageController.index);
router.post('/', messageController.create);
router.put('/:messageId/channels/:channelId', messageController.update);
router.delete('/:messageId/channels/:channelId', messageController.delete);

module.exports = router;
