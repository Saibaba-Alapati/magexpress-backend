const client = require('.././../database');

//CREATE AND SAVE A PROJECT TO DATABASE 
exports.createProject = (req,res) =>{
    //VALIDATE REQUEST
    if(req.body.name){
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query = {
        name: 'create project',
        text : 'INSERT INTO project(creatorid,name,description) VALUES($1,$2,$3,$4) RETURNING *',
        values : [req.params.userid,req.body.name,req.body.description]
    }
    client
        .query(query)
        .then(data=>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Could not create the Project. "
            });
        });
};

exports.updateProject = (req,res) =>{
    //VALIDATE REQUEST
    if(req.body.name){
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query = {
        name: 'update project',
        text : 'UPDATE project SET name = $2 WHERE id = $1',
        values : [projectid,req.body.name]
    }
    client
        .query(query)
        .then(data=>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Could not update the Project. "
            });
        });
};

exports.deleteProject = (req,res) =>{
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.userid;
    const query = {
        name: 'delete project',
        text : 'DELETE project WHERE id = $1',
        values : [projectid]
    }
    client
        .query(query)
        .then(num => {
            if(num === 1){
                res.send({
                    message:
                        " Deleted project. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Could not update the Project. "
            });
        });
};


exports.deleteProjectandInfo = async(req,res) => {
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.userid;
    const query1 ={
        name : 'delete-trackercomment',
        text :'DELETE trackercomment WHERE creatorid =$1',
        values :[projectid]
    }
    const query2 ={
        name : 'delete-trackers',
        text :'DELETE tracker WHERE creatorid =$1',
        values :[projectid]
    }
    const query3 ={
        name : 'delete-catgorycontainer',
        text :'DELETE categorycontainer WHERE creatorid =$1',
        values :[projectid]
    }
    const query4 ={
        name : 'delete-useraccess-trackercontainer',
        text :'DELETE usersandtrackercontainers WHERE creatorid =$1',
        values :[projectid]
    }
    const query5 ={
        name : 'delete-trackercontainer',
        text :'DELETE trackercontainer WHERE creatorid =$1',
        values :[projectid]
    }
    const query6 ={
        name : 'delete-project',
        text :'DELETE project WHERE creatorid =$1',
        values :[projectid]
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
                                                            if(num==1){
                                                                client
                                                                .query(query6)
                                                                .then(num => {
                                                                    if(num==1){
                                                                        res.send({
                                                                            message:
                                                                                " Deleted all projectdata data. "
                                                                        });
                                                                    }
                                                                }
                                                            )
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
        .then(num => {
            if (num === 1) {
                res.send({
                    message:
                        " Project and info deleted successfully. "
                });
            } else {
            res.send({
                message:
                    ' Project and info deletes successfully.'
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete project and its info. "
        });
        });
}