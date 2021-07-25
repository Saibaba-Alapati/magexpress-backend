const user = require('../controllers/user/user.controller');
const express = require('express');
const userroute =  express.Router();

userroute.post('/signup',user.createUser)

module.exports =  userroute;