const client = require('.././../database');

// Create and Save a new Channel
exports.createChannel = (req, res) => {
    // VAlIDATE REQUEST
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'create-channel',
        text :'INSERT INTO channel(creatorid,roomid,name) VALUES($1,$2,$3) RETURNING *',
        values :[ req.params.userid,req.params.roomid,req.body.name,]
    }
    client
        .query(query)
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || " Could not create channel. "
        })
    })

};

// Retrieve all channels of a room from the database.
exports.findAllChannels = (req, res) => {
    const query ={
        name : 'get-allchannels',
        text :'SELECT * FROM channel WHERE roomid=$1',
        values :[ req.params.roomid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not find all channels of room. ",
            })
        })
};

// Find a single channel with an id
exports.findOneChannel = (req, res) => {
    const query ={
        name : 'get-channel',
        text :'SELECT * FROM channel WHERE id=$1',
        values :[req.body.channelid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not find channel info. ",
            })
        })
};

// Update a Channel by the id in the request
exports.updateChannel = (req, res) => {
    // VAlIDATE REQUEST
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'update-channelinfo',
        text :'UPDATE channel SET name=$1 WHERE id=$2',
        values :[req.body.name,req.body.channelid]
    }
    client
        .query(query)
};

exports.deleteChannel = (req, res) => {
    const channelid = (!req.params.channelid) ? req.body.channelid : req.params.channelid;
    const query ={
        name : 'update-channelinfo',
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
                    " Could not find directmessages. "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message ||" Could not delete directmessages. "
            });
        });
    const query2 ={
        name : 'update-channelinfo',
        text :'DELETE channel WHERE id=$1',
        values :[channelid]
    }
    client
        .query(query2)
        .then(num => {
            if (num === 1) {
            res.send({
                message:
                    " Deleted all directmessages successfully. "
            });
            } else {
            res.send({
                message:
                    " Could not find directmessages. "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message ||" Could not delete directmessages. "
            });
        });
};