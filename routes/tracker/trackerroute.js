const express = require('express');
const trackerroute = express.Router();
const project = require('../../controllers/tracker/project.controller');
const trackercontainer = require('../../controllers/tracker/trackercontainer.controller');
const categorycontainer = require('../../controllers/tracker/categorycontainer.controller');
const tracker = require('../../controllers/tracker/tracker.controller');
const trackercomment = require('../../controllers/tracker/trackercomments.controller');
trackerroute
    .get('/',trackercontainer.findAllContainersRelatedToUser)
    .get('/',trackercontainer.findOneTrackerContainer)
    .post('/',trackercontainer.joinTrackerContainer)
    .post('/:trackercontainerid/trackercontainerinfo',trackercontainer.updateTrackerContainer)
    .delete('/trackercontainerinfo',trackercontainer.deleteTCWithCCandTRandTCR)
    .post('/',categorycontainer.createCategoryContainer)
    .get('/',categorycontainer.FACCOTC)//findallcategorycontainersoftrackercontainer
    .put('/:categorycontainerid/categorycontainerinfo',categorycontainer.updateCategoryContainer) //update category container
    .get('/',categorycontainer.FATOCC) //findAllTrackersOfCategoryContainers
    .put('/',categorycontainer.MTOCC) // moveToOtherCategoryContainer
    .put('/:categorycontainerid',categorycontainer.MTOCC) // moveToOtherCategoryContainer
    .put('/:categorycontainerid/:trackerid',categorycontainer.MTOCC) // moveToOtherCategoryContainer
    .put('/:categorycontainerid/:trackerid',categorycontainer.MTOCC) // moveToOtherCategoryContainer
    .delete('/',categorycontainer.DCCWT) //deleteCategoryContainersWithTrackers
    .delete('/',categorycontainer.DATFCC)//deleteAllTrackersFromCC)
    .delete('/:categorycontainerid',categorycontainer.DCCWT) //deleteCategoryContainersWithTrackers
    .delete('/:categorycontainerid',categorycontainer.DATFCC)//deleteAllTrackersFromCC)
    .post('/:categorycontainerid',tracker.createTracker)
    .post('/',tracker.createTracker)
    .post('/:projectid',tracker.createTracker)
    .get('/:categorycontainerid/:trackerid',tracker.findAllCommentsOnTracker)
    .get('/:categorycontainerid',tracker.findOneTracker)
    .put('/:categorycontainerid/:trackerid',tracker.updateTracker)
    .delete('/:categorycontainerid/:trackerid',tracker.deleteTracker)
    .delete('/:categorycontainerid/:trackerid',tracker.deleteFewTrackers)
    .post('/:categorycontainerid/:trackerid',trackercomment.createComment)
    .put('/:categorycontainerid/:trackerid',trackercomment.updateComment)
    .delete('/:categorycontainerid/:trackerid',trackercomment.deleteComment);
module.exports =  trackerroute;