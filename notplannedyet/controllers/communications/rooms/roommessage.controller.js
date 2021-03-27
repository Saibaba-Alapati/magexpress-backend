const client = require('.././../database');
// CREATE AND SAVE ROOM MESSAGE
exports.createRoomMessage = (req, res) => {
    const query ={
        name : 'create-roommessage',
        text :'INSERT INTO roommessage(creatorid,channelid,roomid,content) VALUES($1,$2,$3,$4) RETURNING *',
        values :[req.params.userid,req.params.channelid,req.params.roomid,req.body.content]
    }
    client
        .query(query)
};

// FIND ALL ROOM MESSAGES
exports.findAllRoomMessages = (req, res) => {
    const channelid = (!req.params.channelid) ? req.body.channelid : req.params.channelid;
    const query ={
        name : 'get-allroommessages',
        text :'SELECT * FROM roommessage WHERE channelid=$1',
        values :[channelid]
    }
    client
        .query(query)
        .then(data =>  {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not find all room messages. ",
            })
        })
};

// FIND A ROOM MESSAGE
exports.findOne = (req, res) => {
    const query ={
        name : 'get-roommessage',
        text :'SELECT * roommessage WHERE id=$1',
        values :[req.body.roommessageid]
    }
    client
        .query(query)
        .then(data =>  {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not find roommessage. " ,
            })
        })
};

// UPDATE A ROOM MESSAGE
exports.updateRoomMessage = (req, res) => {
    const query ={
        name : 'update-roommessage',
        text :'UPDATE roommessage SET content=$1 WHERE id=$2',
        values :[req.body.content,req.body.roommessageid]
    }
    client
        .query(query)
        .then(data =>  {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not upadte roommessage. ",
            })
        })
};

// NOT REQUIRED
// DELETE ROOM MESSAGES
exports.deleteAllMessages = (req, res) => {
    // RoomMessage.destroy({where: {directchat: req.roomId}})
    const channelid = (!req.params.channelid) ? req.body.channelid : req.params.channelid;
    const query ={
        name : 'delete-allroommessages',
        text :'DELETE roommessage WHERE channelid=$1',
        values :[channelid]
    }
    client
        .query(query)
        .then(num => {
            if (num === 1) {
            res.send({
                message:
                    " Deleted all directmessages successfully. "
            });
            } else {
            res.send({
                message:
                    " Could not find directmessages."
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Could not delete directmessages."
            });
        });
};
