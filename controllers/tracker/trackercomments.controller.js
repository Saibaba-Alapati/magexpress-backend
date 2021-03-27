const client = require('.././../database');
// CREATE A TRACKER CONTAINER
exports.createComment = (req, res) =>{
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
        text :'INSERT INTO trackercomment(creatorid,trackercontainerid,categorycontainerid ,content,tracker) VALUES($1,$2,$3,$4) RETURNING *',
        values :[req.params.userid,req.params.trackercontainerid,req.params.categorycontainerid, req.body.content,req.params.trackerid]
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
        text :'UPDATE trackercomment SET content =$1 WHERE id =$2',
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