const express = require('express');
const channelroute = express.Router();
const roomchannel = require('/Users/saibabaalapati/Desktop/magexpress/backend/controllers/communications/rooms/roomchannel.controller.js');
const roommessage = require('/Users/saibabaalapati/Desktop/magexpress/backend/controllers/communications/rooms/roommessage.controller.js');
channelroute.post('/',roomchannel.createChannel)
    .get('/',roomchannel.findAllChannels)
    .get('/',roomchannel.findOneChannel)
    .put('/:channelid/channelinfo',roomchannel.updateChannel)
    .delete('/:channelid/channelinfo',roomchannel.deleteChannel)
    .post('/:channelid',roommessage.createRoomMessage)
    .get('/:channelid',roommessage.findAllRoomMessages)
    .put('/:channelid',roommessage.updateRoomMessage)
    .delete('/:channelid',roommessage.deleteAllMessages);

module.exports = channelroute;
