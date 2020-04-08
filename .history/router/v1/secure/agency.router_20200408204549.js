const router = require('express').Router();
const response = require('ybha-response');
 

const userModule = require('../../../modules/user.module.js');
const tripperModule = require('../../../modules/tripper.module.js');
const agencyModule = require('../../../modules/agency.module.js');
 



 

router.post('/makeOFFER', (req, res) => {
  agencyModule.makeOFFER(req.body).then((result) => {

    response.json(res, result)
  }).catch((err) => {
      console.log(err)
      response.badRequest(res, err);
    });

})
router.post('/agencyoffers', (req, res) => {
  agencyModule.agencyoffers(req.body).then((result) => {

    response.json(res, result)
  }).catch((err) => {
      console.log(err)
      response.badRequest(res, err);
    });

})
router.post('/deleteoffer', (req, res) => {
  agencyModule.deleteoffer(req.body).then((result) => {

    response.json(res, result)
  }).catch((err) => {
      console.log(err)
      response.badRequest(res, err);
    });

})


  router.post('/AgencyBYID', (req, res) => {
    agencyModule.getagencyBYid(req.body).then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })
  router.post('/update', (req, res) => {
   
    agencyModule.update(req.body).then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })

  
  router.post('/delete', (req, res) => {
    agencytModule.delete(req.body).then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })

  router.post('/registrationrequests', (req, res) => {
    agencyModule.registrationrequests().then((result) => {
  
      response.json(res, result)
    }).catch((err) => {
        console.log(err)
        response.badRequest(res, err);
      });

  })


 



module.exports = router