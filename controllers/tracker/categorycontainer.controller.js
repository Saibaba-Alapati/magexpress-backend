const client = require('../../database');

// CREATE AND SAVE A CATEGORY CONTAINER TO DATABASE
exports.createCategoryContainer = (req, res) => {
    const userid = (req.body.userid != null) ? req.body.userid : req.params.userid;
    const projectid = (req.body.projectid != null) ? req.body.projectid : req.params.projectid;
    const trackercontainerid = (req.body.trackercontainerid != null) ? req.body.trackercontainerid : req.params.trackercontainerid;
    // VALIDATE REQUEST
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query = {
        name : 'create-categorycontainer',
        text : 'INSERT INTO categorycontainer(creator_id,project_id,trackercontainer_id,name,description) VALUES($1,$2,$3,$4,$5) RETURNING *',
        values :[userid,projectid,trackercontainerid,req.body.name,req.body.description]
    }
    client
        .query(query)
        .then(results => {
            console.log("Sucess: "+query.values);
            const rows = results.rows;
            res.send({reponse:{rows}});
        })
        .catch(err => {
            console.log("Error: "+query.values);
            res.status(500).send({
            message:
                err.message || " Could not create a CategoryContainer. "
            });
        });
};

// FIND ALL TRACKERS OF CATEGORY CONTAINER
exports.findAllTrackersofCC = (req, res) => {
    const categorycontainerid = (req.body.categorycontainerid != null) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'SELECT * FROM tracker WHERE categorycontainer_id =$1',
        values :[categorycontainerid]
    }
    client
        .query(query)
        .then(results => {
            const rows = results.rows;
            res.send(rows);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not find trackers of category container. "
            });
        });
};

// MOVE TRACKER TO OTHER CATEGORY CONTAINER
exports.moveTrackerofCC = (req, res) => {
    const trackerid = (req.body.trackerid != null) ? req.body.trackerid : req.params.trackerid;
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'UPDATE tracker SET categorycontainer_id=$1 WHERE id =$2',
        values :[req.body.categorycontainerid,trackerid]
    }
    client
        .query(query)
        .then(num => {
            if(num === 1){
                res.send({
                    message:
                        " Shifted successfully to other category. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not shift the tracker. "
            });
        });
};

// UPADTE A CATEGORYCONTAINER NAME AND DESCRIPTION
exports.updateCategoryContainer = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const categorycontainerid = (req.body.categorycontainerid!=null) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'UPDATE tracker SET name=$1,description=$2 WHERE id=$3',
        values :[req.body.name,req.body.description,categorycontainerid]
    }
    client
        .query(query)
        .then(results => {
            const rows = results.rows;
            res.send(rows);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Not able to update the category container. "
            })
        })
};


// DELETE CATEGORY CONTAINER WITH TRACKERS
exports.deleteCCwithTrackers = (req, res) => {
    const categorycontainerid = (req.body.categorycontainerid!=null) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'delete-trackers-of-categorycontainer',
        text :'DELETE tracker WHERE categorycontainer_id =$1',
        values :[categorycontainerid]
    }
    client
        .query(query)
        .then(num => {
            if(num === 1){
                res.send({
                    message:
                        " Deleted all trackers of trackercontainer successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete all trackers of tracker conatiners. "
            });
        });
    const query2 ={
        name : 'delete-categorycontainer',
        text :'DELETE categorycontainer WHERE id =$1',
        values :[categorycontainerid]
    }
    client
        .query(query2)
        .then(num =>{
            if(num === 1){
                res.send({
                    message:
                        " Deletion was successful. "
                });
            }else{
                res.send({
                    message:
                        " Failed to Delete. "
                });
            }})
            .catch(err =>{
                res.status(500).send({
                    message:
                        err.message ||" Couldn't find the categorycontainer. "
                });
            })
};


// DELETE ALL TRACKERS FROM CATEGORY CONTAINER
exports.deleteAllTrackersFromCC = (req, res) => {
    const categorycontainerid = (req.body.categorycontainerid!=null) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'delete-trackers-of-categorycontainer',
        text :'DELETE tracker WHERE categorycontainer_id =$1',
        values :[categorycontainerid]
    }
    client
        .query(query)
        .then(num => {
            if(num === 1){
                res.send({
                    message:
                        " Deleted all trackers of trackercontainer successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while deleting all trackers of tracker conatiners. "
            });
        });
};