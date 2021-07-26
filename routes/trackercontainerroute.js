const express = require('express');
const trackercontainerroute = express.Router();

const trackercontainer = require('../controllers/tracker/trackercontainer.controller');
    
trackercontainerroute
    .post('/:userid/',trackercontainer.createTrackerContainer) //Tracker Container
    .post('/:userid/:projectid',trackercontainer.createTrackerContainer) //Tracker Container
    .get('/:userid/:projectid',trackercontainer.findAllContainersRelatedToUser) //Tracker Container
    .get('/:userid/:projectid',trackercontainer.findOneTrackerContainer) //Tracker Container
    .post('/:userid/:projectid',trackercontainer.joinTrackerContainer) //Tracker Container
    .post('/:userid/:projectid/:trackercontainerid',trackercontainer.joinTrackerContainer) //Tracker Container
    .get('/:userid/:projectid',trackercontainer.userAccessCheck) //Tracker Container
    .delete('/:userid/:projectid',trackercontainer.deleteTCWithCCandTRandTCR) //Tracker Container
    .put('/:userid/:projectid/:trackercontainerid',trackercontainer.updateTrackerContainer) //Tracker Container

    module.exports = trackercontainerroute;