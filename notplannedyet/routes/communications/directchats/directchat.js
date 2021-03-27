const express = require('express');
const directchatroute = express.Router();
const directchat = require('/Users/saibabaalapati/Desktop/magexpress/backend/controllers/communications/directchats/directchat.controller');
const directmessage = require('/Users/saibabaalapati/Desktop/magexpress/backend/controllers/communications/directchats/directmessage.controller');

directchatroute.post('/',directchat.createDirectChat)
    .get('/',directchat.findAllDirectchatOfUser)
    .delete('/:directchatid',directchat.deleteDirectChat)
    .delete('/',directchat.deleteDirectChat)
    .delete('/',directchat.deleteFewDirectChat)
    .delete('/',directchat.findOneDirectChat)
    .post('/:directchatid',directmessage.createDirectMessage)
    .get('/:directchatid',directmessage.findAllDirectMessages)
    .delete('/:directchatid',directmessage.deleteDirectMessage)
    .delete('/:directchatid',directmessage.deleteAllDirectMessages);
module.exports = directchatroute;