const express = require('express');
const trackerroute = express.Router();
const project = require('../../controllers/tracker/project.controller');
const trackercontainer = require('../../controllers/tracker/trackercontainer.controller');
const categorycontainer = require('../../controllers/tracker/categorycontainer.controller');
const tracker = require('../../controllers/tracker/tracker.controller');
const trackercomment = require('../../controllers/tracker/trackercomments.controller');
trackerroute
    .get('/',project.getProjects) //project
    .get('/',project.getTheProject) //project
    .get('/:projectid',project.getTheProject) //project
    .post('/',project.createProject) //project
    .put('/',project.updateProject) //project
    .put('/:projectid',project.updateProject) //project
    .delete('/',project.deleteProject) //project
    .delete('/:projectid',project.deleteProject) //project
    .post('/',project.joinProject) //project
    .post('/:projectid',project.joinProject) //project
    .get('/',project.userAccessCheck) //project
    .post('/',trackercontainer.createTrackerContainer) //Tracker Container
    .post('/:projectid',trackercontainer.createTrackerContainer) //Tracker Container
    .get('/:projectid',trackercontainer.findAllContainersRelatedToUser) //Tracker Container
    .get('/:projectid',trackercontainer.findOneTrackerContainer) //Tracker Container
    .post('/:projectid',trackercontainer.joinTrackerContainer) //Tracker Container
    .post('/:projectid/:trackercontainerid',trackercontainer.joinTrackerContainer) //Tracker Container
    .get('/:projectid',trackercontainer.userAccessCheck) //Tracker Container
    .delete('/:projectid',trackercontainer.deleteTCWithCCandTRandTCR) //Tracker Container
    .put('/:projectid/:trackercontainerid',trackercontainer.updateTrackerContainer) //Tracker Container
    .post('/:projectid/:trackercontainerid',categorycontainer.createCategoryContainer) //Category Container
    .get('/:projectid/:trackercontainerid',categorycontainer.FACCOTC) //Category Container
    .get('/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.FATOCC) //Category Container
    .put('/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.MTOCC) //Category Container
    .put('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',categorycontainer.MTOCC) //Category Container
    .put('/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.updateCategoryContainer) //Category Container
    .delete('/:projectid/:trackercontainerid',categorycontainer.DCCWT) //Category Container
    .delete('/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.DCCWT) //Category Container
    .delete('/:projectid/:trackercontainerid',categorycontainer.DATFCC) //Category Container
    .delete('/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.DATFCC) //Category Container
    .post('/:projectid/:trackercontainerid/:categorycontainerid',tracker.createTracker) //Tracker
    .get('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',tracker.findAllCommentsOnTracker) //Tracker
    .get('/:projectid/:trackercontainerid/:categorycontainerid',tracker.findOneTracker) //Tracker
    .put('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',tracker.updateTracker) //Tracker
    .delete('/:projectid/:trackercontainerid/:categorycontainerid',tracker.deleteTracker) //Tracker
    .delete('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',tracker.deleteTracker) //Tracker
    .delete('/:projectid/:trackercontainerid/:categorycontainerid',tracker.deleteFewTrackers) //Tracker
    .post('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',trackercomment.createComment) //Tracker Comment
    .put('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',trackercomment.updateComment) //Tracker Comment
    .delete('/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',trackercomment.deleteComment); //Tracker Comment

module.exports =  trackerroute;