const room = require('/Users/saibabaalapati/Desktop/magexpress/backend/controllers/communications/rooms/room.controller.js');
const  express = require('express');
const roomroute = express.Router();

roomroute.post('/',room.createRoom)
    .get('/',room.findAllRooms)
    .get('/',room.findRoom)
    .get('/:roomid/roominfo',room.updateRoom)
    .delete('/:roomid/roominfo',room.deleteRoom)
    .post('/',room.joinRoom);

module.exports = roomroute;