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




   module.exports.updateB = (blogger) => {
    return new Promise((resolve, reject) => {
        console.log("*************************************")
       console.log("blogger : ",blogger)
       User.findOneAndUpdate({_id: blogger._id},blogger, { new: true }).then(dt => {
           console.log("ressss : ",dt)
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
      let newblogger = new User(blogger)
      
      newblogger.activated=true
      newblogger.Agency_name =""
      newblogger.status=""
      newblogger.save((err, res) => {
        if(err) reject(err)
        else {
          resolve(res)
          console.log("resss ", res)
        }
      })
    })
  }


/////////////////////////////////////////////////////////// test new add check AZIZ
/*
module.exports.addblogger = (blogger) => {

    return new Promise((resolve, reject) => {
       
        const newuser={}
        newuser.username=blogger.username
        newuser.first_name=blogger.first_name
        newuser.last_name=blogger.last_name
        newuser.email=blogger.email
        newuser.backupemail=blogger.backupemail
        newuser.password=blogger.password
        newuser.adresse=blogger.adresse
        newuser.securityquestion=blogger.securityquestion
        newuser.response =blogger.response
        newuser.code_postal=blogger.code_postal
        newuser.ville=blogger.ville
        newuser.gouvernement=blogger.gouvernement
        newuser.pays=blogger.pays
        newuser.telephone=blogger.telephone
        newuser.date_naissance= blogger.date_naissance
       
        newuser.type_account=blogger.type_account
        newuser. profilePictureUrl=blogger. profilePictureUrl

        newuser.last_signIn=blogger.last_signIn
        newuser.last_signOut=blogger.last_signOut
        newuser.isConnected=blogger.isConnected
       
        newuser. createdAt=moment().tz("Africa/Tunisia").format();
        newuser.updatedAt=moment().tz("Africa/Tunisia").format();
       
         newuser.status  = blogger.status
         newuser.Agency_name =blogger.Agency_name
         newuser.website=blogger.website
         newuser.facebook =blogger.facebook
         newuser.tripadvisor=blogger.tripadvisor
        
       
        //countries the agency activity reach
         
        newuser.experience_SINCE=blogger.experience_SINCE
        // blogger profile theme du contenu , ùotivation to join wantotrip 
        newuser.theme=blogger.theme
        newuser.socialMedia = blogger.socialMedia
        
        newuser.motivation  =blogger.motivation

        newuser.role="blogger"
        newuser.activated=true 
        
        newuser.save(function(err, user) {
        let user0=  new User (newuser)
      user0.save(function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user)
                 console.log("my blogger : ",user)
            }

        })

        })


    })    }*/


