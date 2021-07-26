const express = require('express');
const categorycontainerroute = express.Router();
const categorycontainer = require('../controllers/tracker/categorycontainer.controller');

categorycontainerroute
    .post('/:userid/:projectid/:trackercontainerid/create',categorycontainer.createCategoryContainer) 
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid/getalltrackers',categorycontainer.findAllTrackersofCC) 
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/movetrackerofcc',categorycontainer.moveTrackerofCC) 
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',categorycontainer.moveTrackerofCC) 
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/update',categorycontainer.updateCategoryContainer) 
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid/deletealltrackersfromcc',categorycontainer.deleteAllTrackersFromCC) 
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid/deleteccwithtrackers',categorycontainer.deleteCCwithTrackers);

module.exports = categorycontainerroute;