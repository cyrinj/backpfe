const router = require('express').Router();
const response = require('ybha-response');
var nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const userModule = require('../../../modules/user.module.js');
const authModule = require('../../../modules/auth.module.js');
  const getUserFromToken = require('../middlewares/utility/getUserFromToken')
  const tokenInHeaders = require('../middlewares/utility/tokenInHeaders')
  const activateUser = require('../middlewares/utility/activateUser')
// const Mailer = require("../../../modules/utilities/email.module.js");
 
// Register a new User
var accessToken,mailOptions,host,link,mailx;
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rbiiaziz900@gmail.com",
        //process.env.GMAILPW EXPORT
        pass: process.env.GMAILPW
    }
   });

   router.all('/*', function (req, res, next) {
    // CORS headers
    res.header("X-Frame-Options", "ALLOW-FROM https://www.google.com https://www.youtube.com"); // restrict it to the required domain
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,X-Frame-Options');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

router.post('/forgetPassword', (req, res) => {
    let password = Math.random().toString(36).slice(-8);
    let email = req.body.email
    console.log('############## email ##############', email)
    authModule.forgetPassword(email, password).then(data => {
       if (data!=null )
           { var mailOptions = {
            to: email,
            subject: 'Localhost Reset Password Request',
            //corriger username et new pass dans l'email de forgetpassword
            html: 'Hello<strong> ' + data.username +  '</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8080/#/etape2"> securityquestions /</a>'
  
          }
        
          smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                   console.log(error);
               res.end("error");
            }else{
                   console.log("Message sent: " + response.message);
                   mailx=email
               res.end("sent");
                }
         });
       
 res.json({ success: true, message: 'Please check your e-mail for password reset link' }); // Return success message
  
            
           }
           else {
            res.end("error email doesn't exist");
           } 
    })
 })

 router.post('/resetpassword',   (req, res) => {
    authModule.forgetPassword(mailx, req.body.password).then((data) => {
  
       response.json(res, data)
      
  
  
    }).catch((err) => {
        response.badRequest(res, "erreur reset pass ");
    });
  
  
  
 })


  
 
router.post('/secquestion',   (req, res) => {
    authModule.securtiyquestion(req.body).then((data) => {
         
       if (data==""){response.json(res,"n'existe pas")}
       else{
  
        response.json(res,"existe");
  
       }
    
  
    })
   
  
 })
  

 
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    console.log('################# token ############ \n', token , '\n')
    jwt.verify(token,  process.env.JWT, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user;
       
      next()
    })
   }
   
  router.post('/users', authenticateToken,  (req, res) => {
//console.log("dfsd  ", req.user)
    response.json(res, req.user);
   })
  

   router.get('/users1',  (req, res) => {
   // console.log("dfsd")
   })
  





   router.post('/logout', (req, res) => {
    authModule.logout(req.body).then((data) => {
        response.json(res,data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});

   router.post('/login', (req, res) => {
    authModule.login(req.body.email, req.body.password).then((data) => {
        response.json(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});


var role

router.post('/register', (req, res) => {
  //  console.log('register user router', req.body)

   
    let pass = req.body.password
    authModule.register(req.body).then((data) => {
       
    console.log('############ user register::  ############\n',data  )
     //   console.log('############ password::  ############\n', pass)

        let payload = {
            email: data.email,
            id: data._id,
            username:data.username

        }
         accessToken = jwt.sign(payload, process.env.JWT);
        role =data.role

 
        validate (req,res ,data.email ,  accessToken, role)
     }).catch((err) => {
        console.log(err);
        if (err === "This Email Is Already Taken") {
            response.badRequest(res, "This Email Is Already Taken");
        } else {
            response.badRequest(res);
        }
    });
});
 

 






function validate (req,res,mail,accessToken,role0){
    console.log("------------------------------------------------------")
    console.log("validate token test "+accessToken)
    host=req.get('host');
    link="http://"+req.get('host')+"/api/v1/auth/verify?id="+accessToken;
    if (role0=="agency"){
    mailOptions={
        to : mail,
        subject : " Wantotrip agency  account",
      
        html : "Hello,<br> your registration request for Wantotrip agency  account is being processed. <br> " 
    }}
     else if (role0=="tripper"){
    mailOptions={
        to : mail,
        subject : "Please confirm your Email account",
      
        html : "Hello,<br>Please Click on the link to validate your account. <br><a href="+link+">Click here to verify</a>"
    }}
    else if (role0=="blogger"){
        mailOptions={
            to : mail,
            subject : "Wantotrip blogger account",
          
            html : "Hello,<br> your registration request for Wantotrip agency  account is being processed click here to login to your temporary account. <br><a href="+link+">Click here to verify</a>"
        }}
    else if (role0=="admin"){
        mailOptions={
            to : mail,
            subject : " Admin account",
          
            html : "Hello,<br>Please Click on the link to validate your account. <br><a href="+link+">Click here to verify</a>"
        }}
        else{
            console.log("probleme dans le role iconnu ")
        }

    







   // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            
        res.end("sent");
         }
   });
   }
    


 


   router.get('/verify',function(req,res){
 


   console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    { 
       // console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==accessToken)


        {  console.log("inn the loop")
              authModule.Activate(accessToken ).then((data) => {
                console.log("activated")
            }).catch((err) => {
                console.log(err);

            })





           // console.log("email is verified");
           // res.send("<h1>Email "+mailOptions.to+" is been Successfully verified" + '<script>         setTimeout(function () {  window.location = "http://localhost:8080/"; }, 2000)</script>')
           res.send("<h1>Email "+mailOptions.to+" is been Successfully verified") 
            
   
            //Activate user


            

             
        
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
    });

 

let template = `
<h1> Want to trip :</h1>
<p>merci de cliquer sur le lien pour activer votre compte:</p><br>
`;

module.exports = router 