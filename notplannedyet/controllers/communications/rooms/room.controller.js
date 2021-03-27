const client = require('.././../database');
// CREATE AND SAVE ROOM
exports.createRoom = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'create-room',
        text :'INSERT INTO room(creatorid,name,description) VALUES($1,$2,$3) RETURNING * ',
        values :[req.params.userid,req.body.name,req.body.description],
    }
    client
        .query(query)
        .then(data =>{
            const query ={
                name : 'add-useraccess',
                text :'INSERT INTO usersandrooms(userid,roomid) VALUES($1,$2,$3) RETURNING * ',
                values :[req.params.userid,data.id,]
            }
            client
                .query(query)
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message  :
                    err.message || " Not able to create the room. "
        })
    })
};

// FIND ALL THE ROOMS THAT USER HAS ACCESS TO
exports.findAllRooms = (req, res) => {
    const query ={
        name : 'get-allrooms-of-user',
        text :'SELECT * FROM usersandrooms WHERE userid =$1',
        values :[req.params.userid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{res.status(500).send({
            message  :
                err.message || " Not able findall the room that user is part of."
        })
    })
};

// Find a single room with an id
exports.findRoom = (req, res) => {
    const query ={
        name : 'get-room',
        text :'SELECT * FROM room WHERE id =$1',
        values :[req.body.roomid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message :
                    err.message || " Not able to find the room. "
            })
        })
};
// exports.loadMessage = (req, res) =>{
//     RoomMessage.find({where: { }})
// }
// UPADTE NAME AND DESCRIPION OF ROOM
exports.updateRoom = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'update-roominfo',
        text :'UPDATE room SET name=$1,description=$2 WHERE id =$3',
        values :[ req.body.name,req.body.description,req.params.roomid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message :
                    err.message ||" Not able to update room. "
            })
        })
};

// DELETE A ROOM
exports.deleteRoom = (req, res) => {
    const query ={
        name : 'delete-room',
        text :'DELETE room WHERE id =$1',
        values :[req.params.roomid]
    }
    client
        .query(query)
        .then(num => {
            if (num === 1) {
            res.send({
                message:
                    " Deleted room successfully. "
            });
            } else {
            res.send({
                message:
                    " Could not find room. "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete room. "
            });
        });
};


// JOIN ROOM
exports.joinRoom = (req, res) => {
    const query ={
        name : 'update-roominfo',
        text :'INSERT INTO usersandrooms(userid,roomid) VALUES($1,$2) RETURNING *',
        values :[ req.params.userid,req.body.roomid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message ||" Not able join the room. "
            })
        })
};
