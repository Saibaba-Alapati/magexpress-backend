const client = require('../../database');
// CREATE A TRACKER CONTAINER
exports.createComment = (req, res) =>{
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    const categorycontainerid = (req.body.categorycontainerid != null) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const trackerid = (req.body.trackerid != null) ? req.body.trackerid : req.params.trackerid;

    // VAlIDATE REQUEST
    if (!req.body.content) {
        res.status(400).send({
            message:
                " Content cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'create-trackercomment',
        text :'INSERT INTO trackercomment(creator_id,project_id,trackercontainer_id,categorycontainer_id,tracker_id,content) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
        values :[userid,projectid,trackercontainerid,categorycontainerid,trackerid,req.body.content]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not create the trackercomment. "
            });
        });
}
exports.updateComment = (req, res) =>{
    // VAlIDATE REQUEST
    if (!req.body.content) {
        res.status(400).send({
            message:
                " Content cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'update-trackercomment',
        text :'UPDATE trackercomment SET content=$1 WHERE id=$2',
        values :[req.body.content,req.body.trackercommentid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not update the trackercomment. "
            });
        });
}
exports.deleteComment = (req, res) => {
    const query ={
        name : 'delete-trackercomment',
        text :'DELETE trackercomment WHERE id =$1',
        values :[req.body.trackercommentid]
    }
    client
        .query(query)
        .then(num => {
            if(num === 1){
                res.send({
                    message:
                        " Deleted trackercomment successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete all trackercomment. "
            });
        });
}