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
        console.log("blogger : ", blogger)
        User.findOneAndUpdate({ _id: blogger._id }, blogger, { new: true }).then(dt => {
            console.log("ressss : ", dt)
            resolve(dt)

        }).catch((err) => {
            reject(err)
        });
    })
}

module.exports.getalls = (rol) => {

    return new Promise((resolve, reject) => {
        User.find({ role: rol, activated: true }).then(data => {

            if (data && data.length && data.length > 0) {
                resolve(data)

            }
            else {

                reject("no" + rol + "found")
            }
        })
            .catch(err => {
                console.log(' getting messages du getallrole error ', err)
                reject(err);
            })

    })
}

module.exports.allrequests = (stat) => {

    return new Promise((resolve, reject) => {

        trip.find({ "status": stat }).then(data => {

            if (data && data.length && data.length > 0) {
                resolve(data)

            }
            else {

                reject("no new propositions " + stat + " found")
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
        chatx.find({ owner1: id }).then(data => {
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
        User.remove({ _id: id }).then(data => {
            resolve(data)
        }).catch(err => reject(err))
    })

}


module.exports.addblogger = (blogger) => {
    return new Promise((resolve, reject) => {
        let newblogger = new User(blogger)

        newblogger.activated = true
        
        if (newblogger.username == null) { newblogger.username = "" }
        if (newblogger.first_name == null) { newblogger.first_name = "" } 
        if (newblogger.last_name == null) { newblogger.last_name = "" } 
        if (newblogger.email == null) { newblogger.email = "" } 
        if (newblogger.backupemail == null) { newblogger.backupemail = "" } 
        if (newblogger.pays == null) { newblogger.pays = "" } 
        if (newblogger.ville == null) { newblogger.ville = "" }
        if (newblogger.gouvernement == null) { newblogger.gouvernement = "" }
        if (newblogger.date_naissance == null) { newblogger.date_naissance = "" }
        if (newblogger.code_postal == null) { newblogger.code_postal = "" }
        if (newblogger.adresse == null) { newblogger.adresse = "" }
        if (newblogger.telephone== null) { newblogger.telephone = "" }
        if (newblogger.securityquestion == null) { newblogger.securityquestion = "" }
        if (newblogger.response == null) { newblogger.response = "" }
        if (newblogger.socialMedia.facebook == null) { newblogger.socialMedia.facebook = "" }
        if (newblogger.socialMedia.youtube == null) { newblogger.socialMedia.youtube = "" }
        if (newblogger.socialMedia.instagram == null) { newblogger.socialMedia.instagram = "" }
        if (newblogger.Agency_name == null) { newblogger.Agency_name = "" }
        if (newblogger.website== null) { newblogger.website = "" }
        if (newblogger.facebook== null) { newblogger.facebook= "" }
        if (newblogger.tripadvisor== null) { newblogger.tripadvisor = "" }
        if (newblogger.status== null) { newblogger.status= "" }

       /* newblogger.createdAt = moment().tz("Africa/Tunisia").format();
        newblogger.updatedAt = moment().tz("Africa/Tunisia").format();*/
        let date_ob = new Date();

        //current date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        // current year
        let year = date_ob.getFullYear();
        
        // current hours
        let hours = date_ob.getHours();
        
        // current minutes
        let minutes = date_ob.getMinutes();
        
        // current seconds
        let seconds = date_ob.getSeconds();

     let   d= year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

     newblogger.createdAt = d
     newblogger.updatedAt = d
       
        newblogger.last_signIn = ""
        newblogger.last_signOut = ""
        newblogger.isConnected =false

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        newblogger.password = hash
        console.log("hhhh")
        // newblogger.status=""
        newblogger.save((err, res) => {
            if (err) reject(err)
            else {
                resolve(res)
            }
        })
    })
}


/////////////////////////////////////////////////////////// test new add check AZIZ
/*
module.exports.addblogger = (blogger) => {

    return new Promise((resolve, reject) => {

        const newuser = {}
        newuser.username = blogger.username
        newuser.first_name = blogger.first_name
        newuser.last_name = blogger.last_name
        newuser.email = blogger.email
         newuser.backupemail=blogger.backupemail
        newuser.password = blogger.password
        newuser.adresse = blogger.adresse
        newuser.securityquestion = blogger.securityquestion
        newuser.response = blogger.response
        newuser.code_postal = blogger.code_postal
        newuser.ville = blogger.ville
        newuser.gouvernement = blogger.gouvernement
        newuser.pays = blogger.pays
        newuser.telephone = blogger.telephone
        newuser.date_naissance = blogger.date_naissance

        newuser.type_account = blogger.type_account
        newuser.profilePictureUrl = blogger.profilePictureUrl

        newuser.last_signIn = blogger.last_signIn
        newuser.last_signOut = blogger.last_signOut
        newuser.isConnected = blogger.isConnected

        newuser.createdAt = moment().tz("Africa/Tunisia").format();
        newuser.updatedAt = moment().tz("Africa/Tunisia").format();

        newuser.status = blogger.status
        newuser.Agency_name = blogger.Agency_name
        newuser.website = blogger.website
        newuser.facebook = blogger.facebook
        newuser.tripadvisor = blogger.tripadvisor


        //countries the agency activity reach

        //    newuser.experience_SINCE=blogger.experience_SINCE
        // blogger profile theme du contenu , ùotivation to join wantotrip 
        newuser.theme = blogger.theme
        //  newuser.socialMedia = blogger.socialMedia

        //   newuser.motivation  =blogger.motivation

        newuser.role = "blogger"
        newuser.activated = true

        newuser.save(function (err, user) {
            console.log("")
            let user0 = new User(newuser)
            user0.save(function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user)
                    console.log("my blogger : ", user)
                }

            })

        })


    })
}
*/

