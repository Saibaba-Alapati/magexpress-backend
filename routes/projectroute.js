const express = require('express');
const projectroute = express.Router();
const project = require('../controllers/tracker/project.controller');

projectroute
    .get('/:userid/',project.getProjects) //project
    .get('/:userid/',project.getTheProject) //project
    .put('/:userid/',project.updateProject) //project
    .post('/:userid/',project.joinProject) //project
    .delete('/:userid/',project.deleteProject) //project
    .get('/:userid/',project.userAccessCheck) //project
    .post('/:userid/create',project.createProject) //project 
    .get('/:userid/:projectid',project.getTheProject) //project
    .put('/:userid/:projectid',project.updateProject) //project
    .delete('/:userid/:projectid',project.deleteProject) //project
    .post('/:userid/:projectid',project.joinProject) //project

module.exports = projectroute;