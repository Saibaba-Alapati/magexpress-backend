const express = require('express');
const trackercommentroute = express.Router();
const trackercomment = require('../controllers/tracker/trackercomment.controller');

trackercommentroute
    .post('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid/create',trackercomment.createComment)
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid/update',trackercomment.updateComment)
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid/delete',trackercomment.deleteComment);

module.exports = trackercommentroute;