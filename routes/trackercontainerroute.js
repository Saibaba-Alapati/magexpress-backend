const express = require('express');
const trackercontainerroute = express.Router();

const trackercontainer = require('../controllers/tracker/trackercontainer.controller');
    
trackercontainerroute
    .post('/:userid/:projectid/createtc',trackercontainer.createTrackerContainer) //Tracker Container
    .get('/:userid/:projectid/getalltcofuser',trackercontainer.findAllContainersRelatedToUser) //Tracker Container
    .get('/:userid/:projectid/gettc',trackercontainer.findOneTrackerContainer) //Tracker Container
    .post('/:userid/:projectid/jointc',trackercontainer.joinTrackerContainer) //Tracker Container
    .post('/:userid/:projectid/:trackercontainerid/jointc',trackercontainer.joinTrackerContainer) //Tracker Container
    .get('/:userid/:projectid/checkaccess',trackercontainer.userAccessCheck) //Tracker Container
    .delete('/:userid/:projectid/deletetc',trackercontainer.deleteTCWithCCandTRandTCR) //Tracker Container
    .put('/:userid/:projectid/:trackercontainerid/updatetc',trackercontainer.updateTrackerContainer) //Tracker Container

    module.exports = trackercontainerroute;