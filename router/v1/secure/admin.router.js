const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const adminModule = require('../../../modules/admin.module.js');

var mkdirp = require('mkdirp');





const multer = require('multer');

var path = require('path')




router.post('/allmessagesbyadmin', (req, res) => {
  console.log('mmmm')
    adminModule.allmessagesbyuser(req.body.id).then((result) => {
      response.json(res, result)
    }).catch((err) => {
      response.badRequest(res, err);
    });
  })
  // input role out put users
  router.post('/getallrole', (req, res) => {
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
      
    




module.exports = router;