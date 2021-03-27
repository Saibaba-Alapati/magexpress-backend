const nodemailer  = require('nodemailer');

exports.mailer = (req,res) => {
    nodemailer.createTransport({
        service: req.body.service,
        auth: {
            user : req.body.from,
            pass: req.body.pass
        }
    })
    var mailOptions = {
        from : req.body.from,
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text,
        html : req.body.html
    }
    this.transporter.sendMail(mailOptions,function(err,info){
        if(err){
            return console.log(err);
        }
        console.log('Message sent: ' + info.response)
    })
    res.send({
        message:
                    ' Process was successful. '
    });
}