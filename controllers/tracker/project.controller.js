const client = require('../../database');

//GET ALL THE PROJECTS OF A USER
exports.getAllProjects  = (req,res) =>{
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const query = {
        name: 'create project',
        text : 'SELECT * FROM userandproject WHERE useer_id=$1',
        values : [userid]
    }
    client
        .query(query)
        .then(results => {
            const rows = results.rows;;
            res.send({response:{rows}});
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while retrieving projects info. "
            });
        });
}

//GET PROJECT
exports.getProject  = (req,res) =>{
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query = {
        name: 'get a particular project',
        text : 'SELECT * FROM project WHERE id=$1',
        values : [projectid]
    }
    client
        .query(query)
        .then(results => {
            const rows = results.rows;
            res.send({response:{rows}});
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while retrieving projects info. "
            });
        });
}
//CREATE AND SAVE A PROJECT TO DATABASE 
exports.createProject = (req,res) =>{
    //VALIDATE REQUEST
    if(!req.body.name){
        res.status(400).send({
            message:
                " name field cannot be empty. "
        });
        return;
    }
    const query = {
        name: 'create project',
        text : 'INSERT INTO project(creator_id,name,description) VALUES($1,$2,$3) RETURNING *',
        values : [req.params.userid,req.body.name,req.body.description]
    }
    client
        .query(query)
        .then(results=>{
            // console.log("success: "+req.body);
            // console.log("success: "+query.values);
            const rows = results.rows;
            // console.log("success: "+rows);
            res.send({reponse:{rows}});
        })
        .catch(err => {
            // console.log("error: "+req.body);
            // console.log("error: "+req.path);
            // console.log("error: "+query.values);
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
                " name cannot be empty. "
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
        .then(results =>{
            const rows = results.rows;
            res.send({response:{rows}});
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
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query1 ={
        name : 'delete-trackercomment',
        text :'DELETE trackercomment WHERE creator_id =$1',
        values :[projectid]
    }
    const query2 ={
        name : 'delete-trackers',
        text :'DELETE tracker WHERE creator_id =$1',
        values :[projectid]
    }
    const query3 ={
        name : 'delete-catgorycontainer',
        text :'DELETE categorycontainer WHERE creator_id =$1',
        values :[projectid]
    }
    const query4 ={
        name : 'delete-useraccess-trackercontainer',
        text :'DELETE userandtrackercontainer WHERE creator_id =$1',
        values :[projectid]
    }
    const query5 ={
        name : 'delete-trackercontainer',
        text :'DELETE trackercontainer WHERE creator_id =$1',
        values :[projectid]
    }
    const query6 ={
        name : 'delete-project',
        text :'DELETE project WHERE creator_id =$1',
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


// JOIN ACCESS TO Project
exports.joinProject = (req, res) => {
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query ={
        name : 'join-project',
        text :'INSERT INTO userandproject(userid,projectid) VALUES ($1,$2) RETURNING *',
        values :[userid,projectid]
    }
    client
        .query(query)
        .then(results =>{
            const rows = results.rows;
            res.send({response:{rows}});
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
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const query ={
        name : 'check-access-to-trackercontainer',
        text :'INSERT INTO userandtproject(userid,projectid) VALUES ($1,$2) RETURNING *',
        values :[userid,projectid]
    }
    client
        .query(query)
        .then(function(data){
            if(!data){
                return 'user notfound'
            }else{
                const query ={
                    name : 'check-access-to-trackercontainer',
                    text :'SELECT * FROM project WHERE id =$1',
                    values :[req.body.projectid ]
                }
                client
                    .query(query)
                    .then(results =>{
                        const rows = results.rows;
                        res.send({response:{rows}});
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