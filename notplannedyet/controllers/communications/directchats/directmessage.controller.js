const client = require('.././../database');
// CREATE AND SAVE DIRECT MESSAGE
// modify receiver id logic
exports.createDirectMessage = async(req, res) => {
    const query ={
        name : 'create-directmessage',
        text :'INSERT INTO directmessage(authorid,receiverid,directchatid,content,replyid,privatereplyid) VALUES ($1,$2,$3,$4,$4,$6) RETURNING *',
        values :[req.params.userid,req.body.receiverid,req.params.directchatid, req.body.content,req.body.replyid,req.body.privatereplyid],
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not create direct message. ",
            })
        })
};

// FIND A DIRECT MESSAGE
exports.findOneDirectMessage = async(req, res) => {
    const query ={
        name : 'fetch-directmessage',
        text :'SELECT * FROM directmessage WHERE id=$1 ',
        values :[req.body.directmessageid],
    }
    client
        .query(query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Could not find directmessage. " + err,
            })
        })
};

// FIND ALL DIRECT MESSAGES
exports.findAllDirectMessages = async(req, res) => {
    const query ={
        name : 'fetch-alldirectmessages',
        text :'SELECT * FROM directmessage WHERE directchatid=$1',
        values :[req.params.directchatid],
    }
    client
        .query(query)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not find all directmessages of user. " + err,
            })
        })
};


// DELETE A DIRECT MESSAGE
exports.deleteDirectMessage = async(req, res) => {
    const query ={
        name : 'fetch-alldirectmessages',
        text :'DELETE FROM directmessage WHERE id=$1',
        values :[req.body.directmessageid],
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
                err.message || " Could not delete directmessages. "
            });
        });

};

// DELETE ALL DIRECT MESSAGES
exports.deleteAllDirectMessages = async(req, res) => {
    const query ={
        name : 'destroy-alldirectmessages',
        text :'DELETE FROM directmessage WHERE directchatid=$1',
        values :[req.params.directchatid],
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
                err.message || " Could not delete directmessages. "
            });
        });
};

