const express = require('express');
const categorycontainerroute = express.Router();
const categorycontainer = require('../controllers/tracker/categorycontainer.controller');

categorycontainerroute
    .post('/:userid/:projectid/:trackercontainerid',categorycontainer.createCategoryContainer) //Category Container
    .get('/:userid/:projectid/:trackercontainerid',categorycontainer.FACCOTC) //Category Container
    .get('/:userid/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.FATOCC) //Category Container
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.MTOCC) //Category Container
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid/:trackerid',categorycontainer.MTOCC) //Category Container
    .put('/:userid/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.updateCategoryContainer) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid',categorycontainer.DCCWT) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.DCCWT) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid',categorycontainer.DATFCC) //Category Container
    .delete('/:userid/:projectid/:trackercontainerid/:categorycontainerid',categorycontainer.DATFCC) //Category Container

module.exports = categorycontainerroute;