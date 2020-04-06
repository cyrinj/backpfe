const router = require('express').Router();
const response = require('ybha-response');
 

const userModule = require('../../../modules/user.module.js');
const tripperModule = require('../../../modules/tripper.module.js');
const hostModule = require('../../../modules/host.module.js');

 
var async = require('async');
var cmd = require('node-cmd');
 
 

//date format YYYY-MM-DD HH:mm:ss
router.post('/hostrip', (req, res) => {
    hostModule.tohost(req.body).then((result) => {
      response.json(res, result)
    }).catch((err) => {
        response.badRequest(res, err);
      });
  })

  router.post('/update', (req, res) => {
    hostModule.update(req.body).then((result) => {
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });
 })


  router.post('/delete', (req, res) => {
    hostModule.delete(req.body).then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })
  router.post('/allhostedBY', (req, res) => {
    hostModule.allby(req.body.hostid).then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })
  router.get('/allhosted', (req, res) => {
    console.log("hhhhhhhh")
    hostModule.all().then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })
















module.exports = router