const express = require('express');
const trackerroute = express.Router();
const tracker = require('../../controllers/tracker/tracker.controller');
const trackercomment = require('../../controllers/tracker/trackercomments.controller');
trackerroute.post('/:categorycontainerid',tracker.createTracker)
    .post('/',tracker.createTracker)
    .get('/:categorycontainerid/:trackerid',tracker.findAllCommentsOnTracker)
    .get('/:categorycontainerid',tracker.findOneTracker)
    .put('/:categorycontainerid/:trackerid',tracker.updateTracker)
    .delete('/:categorycontainerid/:trackerid',tracker.deleteTracker)
    .delete('/:categorycontainerid/:trackerid',tracker.deleteFewTrackers)
    .post('/:categorycontainerid/:trackerid',trackercomment.createComment)
    .put('/:categorycontainerid/:trackerid',trackercomment.updateComment)
    .delete('/:categorycontainerid/:trackerid',trackercomment.deleteComment);
module.exports =  trackerroute;