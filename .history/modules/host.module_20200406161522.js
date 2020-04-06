const User = require('../models/user.model.js')
const trip = require('../models/trip.model.js')
const chatx = require('../models/chat.model.js')
const host = require('../models/hosting.model.js')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
  
module.exports.tohost = (demande) => {
    return new Promise((resolve, reject) => {
      let newdemande = new host(demande)
      newdemande.status="on hold "
      newdemande.save((err, res) => {
        if(err) reject(err)
        else {
          resolve(res)
        }
      })
    })
  }

  module.exports.update = (hosting) => {
    return new Promise((resolve, reject) => {
       console.log("host id "+ hosting.hostid)
       host.findOneAndUpdate({_id: hosting._id}, hosting, { new: true }).then(dt => {
          
        resolve(dt)
  
    }) .catch((err) => {
      reject(err)
    });
    })
  }
  
  module.exports.delete = (hosting) => {
    return new Promise((resolve, reject) => {
     host.remove({_id: hosting._id}).then(data => {
        resolve(data)
      }).catch(err => reject(err))
    })
  }
  module.exports.allby = (id) => {
    return new Promise((resolve, reject) => {
      //console.log("test id : ", id)
      host.find({hostid:id}).then(data => {
        if(data && data.length && data.length > 0) {
          resolve(data)
        }else {
          resolve('no hosted trip yet')
        }
      }).catch(err => reject(err))
    })
    
  }
  module.exports.all= () => {
    return new Promise((resolve, reject) => {
      host.find().then(data => {
        if(data && data.length && data.length > 0) {
          resolve(data)
        }else {
          resolve('no hosted trip yet by anyone')
        }
      }).catch(err => reject(err))
    })
    
  }
  
