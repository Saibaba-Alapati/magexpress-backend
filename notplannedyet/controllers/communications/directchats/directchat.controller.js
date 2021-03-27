const client = require('/Users/saibabaalapati/Desktop/magexpress/backend/database.js')
exports.createDirectChat = (req, res) => {
    const query ={
        name : 'create-directchat',
        text :' INSERT INTO directchat(userid1,userid2) VALUES ($1,$2) RETURNING *',
        values :[req.params.userid,req.body.otheruserid],
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Not able to create direct chat. ",
            })
        })
};

// FIND ALL DIRECT CHATS OF THE USER
exports.findAllDirectchatOfUser = (req, res) => {
    const query ={
        name : 'find-alldirectchat',
        text :' SELECT * FROM directchat userid1=$1 OR userid2=$1',
        values :[req.params.userid],
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Not able to get all user realted directchats. "
            })
        })
};

// FIND DIRECT CHAT
exports.findOneDirectChat = (req, res) => {
    // DirectChat.findById(req.body.directchatid)
    const query ={
        name : 'find-alldirectchat',
        text :' SELECT * FROM directchat userid1=$1 OR userid2=$1',
        values :[req.params.userid],
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Not able to find direct chat. "
            })
        })
};
//from body and params
// DELETE A DIRECT CHAT
exports.deleteDirectChat = (req, res) => {
    const directchatid = (!req.params.directchatid) ? req.body.directchatid : req.params.directchatid ;
    const query ={
        name : 'destroy-directmessages-of-directchat',
        text :'DELETE FROM directmessage WHERE directchatid=$1 ',
        values :[directchatid],
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
            message: " Could not delete directmessages. "
            });
        });
    const query2 ={
        name : 'destroy-directchat',
        text :'DELETE FROM directchat WHERE id=$1 ',
        values :[directchatid],
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
                err.message || "Could not delete directmessages."
            });
        });
};

//revise and reviseandfix
// DELETE FEW DIRECT CHATS
exports.deleteFewDirectChat = (req, res) => {
    const query ={
        name : 'destroy-messages -of-fewdirectchat',
        text :'DELETE FROM directmessage WHERE directchatid=$1 ',
        values :[req.body.directchatids],
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

    const query2 ={
        name : 'destroy-fewdirectchat',
        text :'DELETE FROM directmessage WHERE id=$1 ',
        values :[req.body.directchatids],
    }
    client
        .query(query2)
        .then(num => {
            if (num === 1) {
            res.send({
                message:
                    " Deleted directchats successfully. "
            });
            } else {
            res.send({
                message:
                    " Could not find directchats. "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete directchats. "
            });
        });
};
