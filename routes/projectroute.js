const express = require('express');
const projectroute = express.Router();
const project = require('../controllers/tracker/project.controller');

projectroute
    .get('/:userid/getall',project.getProjects) //project
    .get('/:userid/get',project.getTheProject) //project
    .put('/:userid/update',project.updateProject) //project
    .post('/:userid/join',project.joinProject) //project
    .delete('/:userid/delete',project.deleteProject) //project
    .get('/:userid/useraccesscheck',project.userAccessCheck) //project
    .post('/:userid/create',project.createProject) //project

module.exports = projectroute;