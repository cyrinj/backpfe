const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const adminModule = require('../../../modules/admin.module.js');

var mkdirp = require('mkdirp');
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "rbiiaziz900@gmail.com",
      //process.env.GMAILPW EXPORT
      pass: process.env.GMAILPW
  }
 });




const multer = require('multer');

var path = require('path')



router.post('/updateBlogger', (req, res) => {
  console.log("*************")
  adminModule.updateB(req.body).then((result) => {
    response.json(res, result)
  }).catch((err) => {
      console.log(err)
      response.badRequest(res, err);
    });
})



router.post('/addblogger', (req, res) => {
   console.log("req.body : ",req.body)
    adminModule.addblogger(req.body).then((result) => {
      console.log("*****************"+result)

      response.json(res, result)
    }).catch((err) => {
      response.badRequest(res, err);
    });
  })


router.post('/deleteuser', (req, res) => {
   console.log("req.body : ", req.body)
    adminModule.deletinguser(req.body._id).then((result) => {
      response.json(res, result)
    }).catch((err) => {
      response.badRequest(res, err);
    });

  })


router.post('/allmessagesbyadmin', (req, res) => {
  console.log('mmmm')
    adminModule.allmessagesbyuser(req.body.id).then((result) => {
      response.json(res, result)
    }).catch((err) => {
      response.badRequest(res, err);
    });
  })
  // input role out put users
  router.post('/getallbyrole', (req, res) => {
    console.log('mmmm')
      adminModule.getalls(req.body.role).then((result) => {
        response.json(res, result)
      }).catch((err) => {
        response.badRequest(res, err);
      });
    })

    
    //  input: status output propositions 
    router.post('/getpropositionsbystatus', (req, res) => {
        adminModule.allrequests(req.body.status).then((result) => {
          response.json(res, result)
        }).catch((err) => {
          response.badRequest(res, err);
        });
      })
      
    // ce router a besoin de front comme gmail . l'admin peut envoyer des mails de la plateforme
      router.post('/mailing', (req, res) => {
        
        mailOptions={
          to : req.body.email ,
          subject : req.body.subject ,
        
          html : "Hello,<br>"+req.body.corps+" <br> " 
      }

      smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
                 console.log(error);
             res.end("error");
          }else{
                 console.log("Message sent: " + response.message);
                 
             res.end("sent");
              }



      })

    })



    

module.exports = router;