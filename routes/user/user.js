const user = require('../../controllers/user/user.controller');
const express = require('express');
const userroute =  express.Router();

userroute.post('/signup',user.createUser)
    .get('/login',user.findOneUser)
    .delete('/:userid/userinfo',user.deleteUserandInfo)
    .put('/:userid/userinfo',user.updateUser)
    .put('/:userid/userinfo',user.updateUserPassword);

module.exports =  userroute;