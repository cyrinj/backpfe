const User = require('../models/user.model.js')
const trip = require('../models/trip.model.js')
const chatx = require('../models/chat.model.js')
const host = require('../models/hosting.model.js')
const  agenceoffer = require('../models/agencyhosting.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
  


module.exports.editprofileAG = (token,x,filename) => {
  console.log("filename",filename)
  return new Promise((resolve, reject) => {
      console.log("test edit profile token.id =  "+token.id)
      User.findByIdAndUpdate(token.id,   
          {
              $set: {
                  
                  profilePictureUrl:"http://localhost:3000/uploads/"+token.id+"/"+filename, 
                   
                      email: x. email,
                       
                      adresse: x.adresse,
                      code_postal: x.   code_postal,
                      ville: x. ville,
                      gouvernement: x.gouvernement,
                      pays: x. pays,
                      telephone: x. telephone,
                      // agence ou local guide
                      status:x.status, 
                      Agency_name: x.Agency_name,
                    
                          website:x.website,
                          tripadvisor: x.tripadvisor,
                      
                       
                      //countries the agency activity reach
                      reach:x.reach , 
                      experience_SINCE: x.experience_SINCE
                      
              } }, { new: true }).then(user => {
              console.log("test edit profile !!! "+ user)
              resolve(user)




  }) .catch(err => {
      console.log(' edit profile err ', err)
      reject(err);
  });


})}





module.exports.makeOFFER = (offer) => {
  return new Promise((resolve, reject) => {
    let newoffer = new agenceoffer (offer)
   newoffer.save((err, res) => {
      if(err) reject(err)
      else {
        resolve(res)
      }
    })
  })}


module.exports.agencyoffers = (agency) => {
  return new Promise((resolve, reject) => {
   agenceoffer.find({hostid: agency._id}).then(data => {
          if(data && data.length && data.length > 0) {
            resolve(data)
          }else {
            resolve('not offer found')
          }
        }).catch(err => reject(err))
   
  })}

module.exports.deleteoffer = (offer) => {
  return new Promise((resolve, reject) => {
    agenceoffer.remove({_id: offer._id}).then(data => {
      resolve(data)
    }).catch(err => reject(err))
  })}
 
    


    module.exports.getagencyBYid = (id) => {
        return new Promise((resolve, reject) => {
          User.find({_id: id}).then(data => {
                if(data && data.length && data.length > 0) {
                  resolve(data)
                }else {
                  resolve('not found')
                }
              }).catch(err => reject(err))
         
        })}

        module.exports.registrationrequests = () => {
            return new Promise((resolve, reject) => {
              User.find({accepted:"false"}).then(data => {
                    if(data && data.length && data.length > 0) {
                      resolve(data)
                    }else {
                      resolve('not found')
                    }
                  }).catch(err => reject(err))
             
            })}

            module.exports.update = (agency) => {
                return new Promise((resolve, reject) => {
                
                  User.findOneAndUpdate({_id: agency._id}, agency, { new: true }).then(dt => {
                      
                    resolve(dt)
              
                }) .catch((err) => {
                  reject(err)
                });
                })
              }
              
              module.exports.delete = (agency) => {
                return new Promise((resolve, reject) => {
                  User.remove({_id: agency._id}).then(data => {
                    resolve(data)
                  }).catch(err => reject(err))
                })
              }


    