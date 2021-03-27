const  express = require('express');
const mailerroute = express.Router();
const mailer = require('../../controllers/mailer/mailer.controller');

mailerroute.post('/send-email',mailer.mailer);
module.exports = mailerroute;