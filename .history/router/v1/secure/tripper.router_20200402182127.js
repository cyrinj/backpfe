const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const tripperModule = require('../../../modules/tripper.module.js');
const adminModule = require('../../../modules/admin.module.js');

var mkdirp = require('mkdirp');





const multer = require('multer');

var path = require('path')


function folder(req, res, next) {
  console.log("./rsc/uploads/" + req.user.id)
  var pth = "./rsc/uploads/" + req.user.id
  mkdirp(pth, function (err) {
    if (err) response.badRequest(res, err)
    else {


      next()
    }
  })
}



const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'rsc/uploads/' + req.user.id);
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + path.extname(file.originalname));
  }


});






var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter



})


/*router.post ('/test' , authenticateToken,folder, upload.single('Image'),(req, res) => {
if (req.file== null) {
  response.badRequest(res, "file format unacepted  ");

 }
  
 
}) */




































router.post('/allmessagesbyadmin', (req, res) => {
  console.log('mmmm')
    tripperModule.allmessagesbyadmin(req.body.id).then((result) => {
      response.json(res, result)
    }).catch((err) => {
      response.badRequest(res, err);
    });
  })

router.post('/updatetrip', (req, res) => {


  tripperModule.updatetrip(req.body).then((result) => {


    response.json(res, result)


  })



})


router.post('/annulertriproposition', (req, res) => {

  console.log("kkkkkkkkkkkk",req.body._id)
  tripperModule.annulertriproposition(req.body._id).then((result) => {

    response.json(res, result)



  }).catch((err) => {
    response.badRequest(res, err);
  });




})

router.post('/submitform', authenticateToken, (req, res) => {
  console.log("mytrip", req.body)
  console.log("myuser", req.user)
  tripperModule.subform(req.user.id, req.body).then((result) => {
    response.json(res, result)



  }).catch((err) => {
    response.badRequest(res, err);
  });

});

router.post('/submitactivity', authenticateToken, (req, res) => {
  console.log("zzzzzzzzzzzz", req.body)
  console.log("fff", req.user.id)
  tripperModule.subactivity(req.user.id, req.body).then((result) => {
    response.json(res, result)

    console.log(result)

  }).catch((err) => {
    response.badRequest(res, err);
    console.log("errr")
  });

});

router.post('/ajoutermessage', (req, res) => {
  console.log("zzzzzzzzzzzz",req.body)
  console.log("fff",req.body.username,req.body.idchat, req.body.message)
  tripperModule.ajouterMessage(req.body.username,req.body.idchat, req.body.message).then((result) => {
    response.json(res, result)

    console.log(result)

  }).catch((err) => {
    response.badRequest(res, err);
    console.log("errr")
  });

});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  console.log('#################" test authorization ################# \n', authHeader)
  const token = authHeader && authHeader.split(' ')[1]
  console.log('#################" test token ################# \n', token)
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.JWT, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    console.log("token dans fonction" + req.user)
    next()
  })
}

router.get('/profile', authenticateToken, (req, res) => {

  tripperModule.profile(req.user).then((result) => {


    response.json(res, result)



  }).catch((err) => {
    response.badRequest(res, err);
  });


})

router.post('/changepassword_in', authenticateToken, (req, res) => {

  // console.log("token dans editprofile \n"+req.user)
  // console.log("token dans editprofile \n"+JSON.stringify(req.body))

  tripperModule.changepassword_in(req.user, req.body).then((result) => {
    response.json(res, result)


  }).catch((err) => {
    response.badRequest(res, err);
  });



})

/*
router.post('/editprofile', authenticateToken, (req, res) => {

  console.log("token dans editprofile \n" + req.user)
  console.log("token dans editprofile \n" + JSON.stringify(req.body))

  tripperModule.editprofile(req.user, req.body).then((result) => {
   

    response.json(res, result)


  }).catch((err) => {
    response.badRequest(res, err);
  });
})*/
/*
router.post("/testedit", function(req, res) {
  console.log(req.body)

})*/

router.post('/editprofile', authenticateToken, folder,upload.single('Image'), (req, res) => {
 console.log("myreq",req.body)
  if (req.file==null) {
   response.badRequest(res, "file format unacepted  ");
  }
  else{
tripperModule.editprofile(req.user ,req.body, req.file.filename ).then((result) => {
 
response.json(res, result) 
}).catch((err) => {
response.badRequest(res, err);
}); 

  }
})




router.post('/allmessagesbyuser', authenticateToken, (req, res) => {
  tripperModule.allmessagesbyuser(req.user.id).then((result) => {
    response.json(res, result)
  }).catch((err) => {
    response.badRequest(res, err);
  });
})



router.post('/alltripsbyuser', authenticateToken, (req, res) => {
  tripperModule.alltripsbyuser(req.user.id).then((result) => {
    response.json(res, result)
  }).catch((err) => {
    response.badRequest(res, err);
  });
})

router.post('/alltripsdraftbyuser', authenticateToken, (req, res) => {
  tripperModule.alltripdraftsbyuser(req.user.id).then((result) => {
    response.json(res, result)
  }).catch((err) => {
    response.badRequest(res, err);
  });
})





router.get('/info', (req, res) => {
  let header = req.headers.authorization
  let arr = header.split(' ')
  if (arr[0] != 'Bearer') {
    response.badRequest(res, 'Not a Valid Request')
  }
  let token = arr[1]
  if (token) {
    tripperModule.getInfoFromToken(token).then(user => {
      delete user.salt
      delete user.password;
      response.json(res, user)
    }).catch(err => response.badRequest(res, err))
  } else {
    response.badRequest(res, 'errr here')
  }
})


//Refresh Token
router.get('/refresh', (req, res) => {
  let header = req.headers.authorization;
  let arr = header.split(' ');
  if (arr[0] !== 'Bearer') {
    response.badRequest(res, "Not a Valid Request");
  }
  let token = arr[1];
  if (token) {
    response.json(res, token)
  } else {
    response.badRequest(res, "merci de relancer votre session");
  }
});


































module.exports = router










