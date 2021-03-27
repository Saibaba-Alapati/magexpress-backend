const user = require('../../controllers/user/user.controller');
const express = require('express');
const userroute =  express.Router();

userroute.post('/signup',user.create)
    .get('/login',user.findOne)
    .delete('/:userid/userinfo',user.deleteUserandInfo)
    .put('/:userid/userinfo',user.update)
    .put('/:userid/userinfo',user.updatePassword);

module.exports =  userroute;