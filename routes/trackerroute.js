const express = require('express');
const trackerroute = express.Router();
const tracker = require('../controllers/tracker/tracker.controller');
trackerroute
    .post('/:userid/:projectid/:trackercontainerid/:categorycontainerid/create',tracker.createTracker) //Tracker
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid/get',tracker.findOneTracker) //Tracker
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid/update',tracker.updateTracker) //Tracker
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid/delete',tracker.deleteTracker) //Tracker
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid/getall',tracker.findAllCommentsOnTracker) //Tracker


module.exports = trackerroute;