const express = require('express');
const trackerroute = express.Router();
const tracker = require('../controllers/tracker/tracker.controller');
trackerroute
    .post('/:userid/:projectid/:trackercontainerid/:categorycontainerid',tracker.createTracker) //Tracker
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',tracker.findAllCommentsOnTracker) //Tracker
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid',tracker.findOneTracker) //Tracker
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',tracker.updateTracker) //Tracker
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid',tracker.deleteTracker) //Tracker
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',tracker.deleteTracker) //Tracker
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid',tracker.deleteFewTrackers) //Tracker


module.exports =  trackerroute;