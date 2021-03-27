const client = require('/Users/saibabaalapati/Desktop/magexpress/backend/database.js')

// CREATE AND SAVE A CATEGORY CONTAINER TO DATABASE
exports.createCategoryContainer = (req, res) => {
    // VALIDATE REQUEST
    if (!req.body.name) {
        res.status(400).send({
            message:
                " Name cannot be empty. "
        });
        return;
    }
    const query ={
        name : 'create-categorycontainer',
        text :'INSERT INTO categorycontainer(creatorid,trackercontainerid,name,description) VALUES($1,$2,$3,$4) RETURNING *',
        values :[req.params.userid,req.params.trackercontainerid,req.body.name,req.body.description,]
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not create a CategoryContainer. "
            });
        });
};

// FIND ALL CATEGORY CONTAINERS OF TRACKER CONTAINER
exports.FACCOTC = (req, res) => {
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'SELECT * FROM categorycontainer WHERE trackercontainerid =$1',
        values :[req.params.trackercontainerid]
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Some error occurred while retrieving category containers. "
            });
        });
};

// FIND ALL TRACKERS OF CATEGORY CONTAINER
exports.FATOCC = (req, res) => {
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'SELECT * FROM tracker WHERE categorycontainerid =$1',
        values :[req.params.categorycontainerid]
    }
    client
        .query(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not find trackers of category container. "
            });
        });
};

// MOVE TRACKER TO OTHER CATEGORY CONTAINER
exports.MTOCC = (req, res) => {
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'UPDATE tracker SET categorycontainerid=$1 WHERE id =$2',
        values :[req.body.tocategorycontainerid,req.body.trackerid]
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
    const categorycontainerid = (!req.params.categorycontainerid) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'get-allcategorycontainer-of-trackercontainer',
        text :'UPDATE tracker SET name=$1,description=$2 WHERE id =$3',
        values :[req.body.name,req.body.description,categorycontainerid]
    }
    client
        .query(query)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || " Not able to update the category container. "
            })
        })
};


// DELETE CATEGORY CONTAINER WITH TRACKERS
exports.DCCWT = (req, res) => {
    const categorycontainerid = (!req.params.categorycontainerid) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'delete-trackers-of-categorycontainer',
        text :'DELETE tracker WHERE categorycontainerid =$1',
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
exports.DATFCC = (req, res) => {
    const categorycontainerid = (!req.params.categorycontainerid) ? req.body.categorycontainerid : req.params.categorycontainerid;
    const query ={
        name : 'delete-trackers-of-categorycontainer',
        text :'DELETE tracker WHERE categorycontainerid =$1',
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