const client = require('.././../database');
// CREATE AND SAVE TRACKER CONTAINER
exports.createTrackerContainer = (req, res) => {
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    if(!req.body.name){
        res.status(400).send({
            message : "name cannot be empty."
        });
        return;
    }
    const query ={
        name : 'create-trackercontainer',
        text :'INSERT INTO trackercontainer(name,description,creatorid,projectid) VALUES($1,$2,$3,$4) RETURNING *',
        values :[req.body.name,req.body.description,userid,projectid]
    }
    client
        .query(query)
        .then(data =>
        {
            const query ={
                name : 'create-trackercomment',
                text :'INSERT INTO usersandtrackercontainers(userid,trackercontainerid) VALUES($1,$2) RETURNING *',
                values :[data.creator,data.id]
            }
            client
                .query(query)
            res.send(data);
        })
        .catch(err =>
            res.status(500).send({
                message:
                    err.message || " Some error ocurred TrackerContainer could not be created. "
            })
        )
};

// FIND ALL TRACKER CONTAINERS USER HAD ACCESS TO
exports.findAllContainersRelatedToUser = (req, res) => {
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query ={
        name : 'get-alltrackercontainer',
        text :'SELECT * FROM usersandtrackercontainers WHERE userid =$1 AND projectid=$2',
        values :[userid,projectid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Could not find all the trackercotainers user have access to. "
            })
        })
};

// FIND TRACKER CONTAINER
exports.findOneTrackerContainer = (req, res) => {
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query ={
        name : 'get-trackercontainer',
        text :'SELECT * FROM trackercontainer WHERE id =$1 AND projectid = $2',
        values :[trackercontainerid,projectid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Error retrieving the TrackerContainer. "
            });
        });
};

// JOIN ACCESS TO TRACKER CONTAINER
exports.joinTrackerContainer = (req, res) => {
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    // const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query ={
        name : 'join-trackercontainer',
        text :'INSERT INTO usersandtrackercontainers(userid,trackercontainerid) VALUES ($1,$2) RETURNING *',
        values :[userid,trackercontainerid ]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Error retrieving the TrackerContainer. "
            });
        });
};

// CHECK USER ACCESS
exports.userAccessCheck = (req,res) => {
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    const query ={
        name : 'check-access-to-trackercontainer',
        text :'SELECT * FROM usersandtrackercontainers WHERE userid =$1',
        values :[userid,trackercontainerid ]
    }
    client
        .query(query)
        .then(function(data){
            if(!data){
                return 'user notfound'
            }else{
                const query ={
                    name : 'check-access-to-trackercontainer',
                    text :'SELECT * FROM trackercontainer WHERE id =$1',
                    values :[req.body.trackercontainerid ]
                }
                client
                    .query(query)
                    .then(data =>{
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                            err.message || "Error retrieving the TrackerContainer"
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error check for access."
            });
        });
}
// UPDATE TRACKER CONTAINER NAME
exports.updateTrackerContainer = (req, res) => {
    // VAlIDATE REQUEST
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    const query ={
        name : 'get-trackercontainer',
        text :'UPDATE trackercontainer SET name=$1,description=$2 WHERE id=$3',
        values :[req.body.name,req.body.description,trackercontainerid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Could not update. "
            })
        })
};

// DELETE ALL TRACKERS FROM TRACKER CONTAINER
exports.deleteTCWithCCandTRandTCR = (req, res) => {
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    const query1 ={
        name : 'delete-trackercomment',
        text :'DELETE trackercomment WHERE trackercontainerid =$1',
        values :[trackercontainerid]
    }
    const query2 ={
        name : 'delete-trackers',
        text :'DELETE tracker WHERE trackercontainerid =$1',
        values :[trackercontainerid]
    }
    const query3 ={
        name : 'delete-catgorycontainer',
        text :'DELETE categorycontainer WHERE trackercontainerid =$1',
        values :[trackercontainerid]
    }
    const query4 ={
        name : 'delete-useraccess-trackercontainer',
        text :'DELETE usersandtrackercontainers WHERE trackercontainerid =$1',
        values :[trackercontainerid]
    }
    const query5 ={
        name : 'delete-trackercontainer',
        text :'DELETE trackercontainer WHERE id =$1',
        values :[trackercontainerid]
    }
    client
        .query(query1)
        .then(num => {
            if(num === 1){
                client
                    .query(query2)
                    .then(num => {
                        if(num === 1){
                            client
                                .query(query3)
                                .then(num => {
                                    if(num === 1){
                                        client
                                            .query(query4)
                                            .then(num => {
                                                if(num === 1){
                                                    client
                                                        .query(query5)
                                                        .then(num => {
                                                            if(num === 1){
                                                                res.send({
                                                                    message:
                                                                        " Deleted all contents and trackercontainer successfully. "
                                                                });
                                                            }
                                                        }
                                                    )
                                                }
                                            })
                                    }
                                })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while deleting all Trackers of tracker conatiners."
            });
        });
};