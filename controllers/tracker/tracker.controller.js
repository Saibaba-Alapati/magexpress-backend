const client = require('../../databaseInfo');
// CREATE AND SAVE TRACKER
exports.createTracker = (req, res) => {
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    const categorycontainerid = (req.body.categorycontainerid != null) ? req.body.categorycontainerid : req.params.categorycontainerid;
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: " Content can not be empty! "
        });
        return;
    }
    const query ={
        name : 'delete-trackercomments',
        text :'INSERT INTO tracker(creatorid,projectid,trackercontainerid,categorycontainerid,content) VALUES($1,$2,$3,$4,$5) RETURNING *',
        values :[userid,projectid,trackercontainerid,categorycontainerid,req.body.content]
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while creating the Tracker. "
            });
        });
};

// FIND ALL COMMENTS ON A TRACKER
exports.findAllCommentsOnTracker = (req, res) => {
    const trackerid = (req.body.trackerid != null) ? req.body.trackerid : req.params.trackerid;

    const query ={
        name : 'delete-trackercomments',
        text :'SELECT * FROM trackercomment WHERE trackerid =$1',
        values :[trackerid]
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while loading comments. "
            });
        });
};

// FIND A TRACKER
exports.findOneTracker = (req, res) => {
    const trackerid = (req.body.trackerid != null) ? req.body.trackerid : req.params.trackerid;
    const query ={
        name : 'delete-trackercomments',
        text :'SELECT * FROM tracker WHERE id =$1',
        values :[trackerid]
    }
    client
        .query(query)
        .then(data=> {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Error retrieving tracker. "
            });
});
};

// UPDATE TRACKER CONTENT
exports.updateTracker = (req, res) => {
    const trackerid = (req.body.trackerid != null) ? req.body.trackerid : req.params.trackerid;
    const query ={
        name : 'delete-trackercomments',
        text :'UPDATE tracker SET content =$1 WHERE id =$2',
        values :[req.body.content,trackerid]
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while updating Tracker. "
            });
        });
};
// DELETE A TRACKER
exports.deleteTracker = (req, res) => {
    const trackerid = (req.body.trackerid != null) ? req.body.trackerid : req.params.trackerid;
    const query ={
        name : 'delete-trackercomments',
        text :'DELETE trackercomment WHERE trackerid =$1',
        values :[trackerid]
    }
    client
        .query(query)
        .then(num => {
            if (num === 1) {
            res.send({
                message:
                    " Deleted comments on tracker successfully. "
            });
            } else {
            res.send({
                message:
                    " Could not find tracker. "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete comments on tracker. "
            });
        });
    const query2 ={
        name : 'delete-trackers-of-categorycontainer',
        text :'DELETE tracker WHERE id =$1',
        values :[trackerid]
    }
    client
        .query(query2)
        .then(num => {
            if(num === 1){
                res.send({
                    message: " Deleted successfully to other category. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while deleting Tracker. "
            });
        });
};


// DELETE FEW TRACKERS
exports.deleteFewTrackers = (req, res) => {
    const query ={
        name : 'delete-trackers-of-categorycontainer',
        text :'DELETE tracker WHERE id =$1',
        values :[req.body.trackerids]
    }
    client
        .query(query)
        .then(num => {
            if (num === 1) {
            res.send({
                message:
                    " Deleted trackers successfully. "
            });
            } else {
            res.send({
                message:
                    "Could not find trackers. "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete trackers. "
            });
        });
};
