const express = require('express');
const projectroute = express.Router();
const project = require('../controllers/tracker/project.controller');

projectroute
    .get('/:userid/getall',project.getAllProjects)
    .get('/:userid/get',project.getProject)
    .put('/:userid/update',project.updateProject)
    .post('/:userid/join',project.joinProject)
    .delete('/:userid/delete',project.deleteProject)
    .get('/:userid/useraccesscheck',project.userAccessCheck)
    .post('/:userid/create',project.createProject);

module.exports = projectroute;