const User = require('../models/user.model.js')
const trip = require('../models/trip.model.js')
const chatx = require('../models/chat.model.js')

const activity = require('../models/activity.model.js')
const chat = require('../models/chat.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U = require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer')
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rbiiaziz900@gmail.com",
        //process.env.GMAILPW EXPORT
        pass: process.env.GMAILPW
    }
   });




   module.exports.update = (blogger) => {
    return new Promise((resolve, reject) => {
        console.log("*************************************")
       console.log("blogger : ",blogger)
       User.findOneAndUpdate({_id: blogger._id}).then(dt => {
          
        resolve(dt)

  
    }) .catch((err) => {
      reject(err)
    });
    })
  }   

module.exports.getalls = (rol) => {

    return new Promise((resolve, reject) => {
        User.find({ role : rol, activated:true } ).then(data => {
            
                if(data && data.length && data.length > 0) {
                resolve(data)
             
            }
            else {
        
                reject("no"+rol+"found")
            }
        })
            .catch(err => {
                console.log(' getting messages du getallrole error ', err)
                reject(err);
            })

    })
}
 
module.exports.allrequests  = (stat) => {

    return new Promise((resolve, reject) => {
      
        trip.find({"status" : stat} ).then(data => {
            
                if(data && data.length && data.length > 0) {
                resolve(data)
             
            }
            else {
        
                reject("no new propositions "+stat+" found")
            }
        })
            .catch(err => {
                console.log(' getting messages du getallrole error ', err)
                reject(err);
            })

    })
}


module.exports.allmessagesbyuser = (id) => {

    return new Promise((resolve, reject) => {
        chatx.find({ owner1: id } ).then(data => {
            //  chatx.find({ owner: id }).then(data => {
            if (data !== null) {
                resolve(data)
              //  console.log("hhh", data)
            }
            else {
              //  console.log("hhh")
                reject("no msg found")
            }
        })
            .catch(err => {
                console.log(' getting messages du user error ', err)
                reject(err);
            })

    })
}

 
 

module.exports.deletinguser = (id) => {

    return new Promise((resolve, reject) => {
        User.remove({_id: id}).then(data => {
            resolve(data)
          }).catch(err => reject(err))
        })

}

module.exports.addblogger = (blogger) => {

    return new Promise((resolve, reject) => {
       
        let newuser = new User(blogger);
        newuser.role="blogger"
        newuser.activated=true 
        
        newuser.save(function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user)
                 console.log("my blogger : ",user)
            }

        })

        })

}










 


  












