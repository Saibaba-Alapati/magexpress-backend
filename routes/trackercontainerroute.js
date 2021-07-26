const express = require('express');
const trackercontainerroute = express.Router();

const trackercontainer = require('../controllers/tracker/trackercontainer.controller');
    
trackercontainerroute
    .post('/:userid/:projectid/create',trackercontainer.createTrackerContainer)
    .get('/:userid/:projectid/getalltcofuser',trackercontainer.findAllContainersRelatedToUser)
    .get('/:userid/:projectid/get',trackercontainer.findOneTrackerContainer)
    .post('/:userid/:projectid/join',trackercontainer.joinTrackerContainer)
    .post('/:userid/:projectid/:trackercontainerid/join',trackercontainer.joinTrackerContainer)
    .get('/:userid/:projectid/checkaccess',trackercontainer.userAccessCheck)
    .delete('/:userid/:projectid/deletetcandcontents',trackercontainer.deleteTrackerContainerandContent)
    .put('/:userid/:projectid/:trackercontainerid/update',trackercontainer.updateTrackerContainer)
    .get('/:userid/:projectid/:trackercontainerid/getallcc',trackercontainer.findAllCCofTC);

    module.exports = trackercontainerroute;