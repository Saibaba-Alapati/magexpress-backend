const express = require('express');
const categorycontainerroute = express.Router();
const categorycontainer = require('../controllers/tracker/categorycontainer.controller');

categorycontainerroute
    .post('/:userid/:projectid/:trackercontainerid/create',categorycontainer.createCategoryContainer) //Category Container
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid/getallcc',categorycontainer.findAllCCofTC) //Category Container
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid/getalltrackers',categorycontainer.findAllTrackersofCC) //Category Container
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/movetrackerofcc',categorycontainer.moveTrackerofCC) //Category Container
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',categorycontainer.moveTrackerofCC) //Category Container
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/update',categorycontainer.updateCategoryContainer) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid/deleteccwithtrackers',categorycontainer.deleteCCwithTrackers) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.deleteCCwithTrackers) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid/deleteccwithtrackers',categorycontainer.deleteAllTrackersFromCC) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid/deleteccwithtrackers',categorycontainer.deleteCCwithTrackers) //Category Container

module.exports = categorycontainerroute;