const categorycontainer = require('../../controllers/tracker/categorycontainer.controller');
const  express = require('express');
const categorycontainerroute = express.Router();
categorycontainerroute
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
    .delete('/:categorycontainerid',categorycontainer.DATFCC);//deleteAllTrackersFromCC)
module.exports =  categorycontainerroute;