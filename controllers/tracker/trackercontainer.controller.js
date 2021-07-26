const client = require('../../database');
// CREATE AND SAVE TRACKER CONTAINER
//need to add user to permisiosn table from client.
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
        text :'INSERT INTO trackercontainer(name,description,creator_id,project_id) VALUES($1,$2,$3,$4) RETURNING *',
        values :[req.body.name,req.body.description,userid,projectid]
    }
    client
        .query(query)
        .then(results =>
        {
            const query ={
                name : 'create-trackercomment',
                text :'INSERT INTO trackercontainers(userid,trackercontainerid) VALUES($1,$2) RETURNING *',
                values :[results.rows[0].creator_id,results.rows[0].id]
            }
            const rows = results.rows;
            res.send({response:{rows}});
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
        text :'SELECT * FROM trackercontainers WHERE user_id =$1 AND project_id=$2',
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
        text :'SELECT * FROM trackercontainer WHERE id =$1 AND project_id = $2',
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
        text :'INSERT INTO trackercontainers(user_id,trackercontainer_id) VALUES ($1,$2) RETURNING *',
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
        text :'SELECT * FROM userandtrackercontainer WHERE user_id =$1',
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
        text :'DELETE trackercomment WHERE trackercontainer_id =$1',
        values :[trackercontainerid]
    }
    const query2 ={
        name : 'delete-trackers',
        text :'DELETE tracker WHERE trackercontainer_id =$1',
        values :[trackercontainerid]
    }
    const query3 ={
        name : 'delete-catgorycontainer',
        text :'DELETE categorycontainer WHERE trackercontainer_id =$1',
        values :[trackercontainerid]
    }
    const query4 ={
        name : 'delete-useraccess-trackercontainer',
        text :'DELETE trackercontainers WHERE trackercontainer_id =$1',
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