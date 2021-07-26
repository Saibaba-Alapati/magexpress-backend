const user = require('../controllers/user/user.controller');
const express = require('express');
const userroute =  express.Router();

userroute.post('/signup',user.createUser)
    .get('/login',user.findOneUser)
    .delete('/:userid/userinfo/delete',user.deleteUserandInfo)
    .put('/:userid/userinfo/update',user.updateUser)
    .put('/:userid/userinfo/updatepass',user.updateUserPassword);
module.exports =  userroute;