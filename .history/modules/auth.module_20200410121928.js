const User = require('../models/user.model.js')
 const chatx = require('../models/chat.model.js')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone')
const U=  require('../modules/user.module.js')
//now is testing u
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;


let env = JSON.parse(fs.readFileSync('./.secret.json'));
Object.keys(env).forEach(key => process.env[key] = env[key]);


module.exports.forgetPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        User.find({ 'email': email }).then(data => {
            let user = data[0]
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            user.password = hash
            User.findOneAndUpdate({ '_id': user._id }, user, { new: true }).then(dt => {
                resolve(dt)
               // console.log("new",dt)
            })
        }).catch((err) => {
            reject(err+ "l 'email inexistant")
  
    })
    })
 }

 module.exports.securtiyquestion = ( reqbody) => {
    return new Promise((resolve, reject) => {
      
        User.find({email:reqbody.email , securityquestion: reqbody.securityquestion, response: reqbody.response}).then(data => {
            resolve(data)
  
        }).catch((err) => {
            console.log(err)
            reject(err)
  
  
    })
  
  
    })}


module.exports.logout = (userx) => {
    return new Promise ((resolve,reject)=>
    {
        console.log("myuser",userx)
        User.findByIdAndUpdate(userx._id, { $set: { isConnected:false,  last_signOut:moment().tz("Africa/Tunisia").format() } }, (err, us) => {
            if (err) {
                reject(err);
            } else {
                resolve("Account  desactivated");
                console.log("desactivation test " )
            }
        });
    })
}









module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
       
        User.find({ email: email })
            .then(data => {
                if (data !== null && data.length && data.length >0  ) {
                    if (bcrypt.compareSync(password, data[0].password)) {
                        let payload = {
                            email: data[0].email,
                            id: data[0]._id,
                            username:data[0].username,
                             
                        }
                        let token = jwt.sign(payload, process.env.JWT);
                     //   console.log("token:  "+token)

                        User.findByIdAndUpdate(data[0]._id, { $set: { isConnected: true, last_signIn: moment().tz("Africa/Tunisia").format() } }, { new: true }).then(user => {
                            delete user.salt;
                            delete user.password;
                          //  console.log("RESULT: " + user);
                            let msg = "success";
                            resolve({ user, token , msg  });
                        }).catch(err => reject(err))

                    } else {
                        let msg = "!password";
                        resolve({ msg });
                        
                    }
                } else {
                    let msg = "!email";
                    resolve({  msg  });

                }
            }).catch(err => {
                console.log('test err ', err)
                reject(err);
            });
    });
}















var x
module.exports.Activate = ( accessToken) => {
    return new Promise((resolve, reject) => {
        console.log("activation accesstoken !! "+ accessToken)

        jwt.verify(accessToken, process.env.JWT, (err, info) => {
            console.log(err+"new bloc /users authenticate token")
            if (err) return res.sendStatus(403)
           else{x=info}
          
           
          })
          console.log("***************************************")
          console.log(x)
          console.log(x.id)
      
          console.log("***************************************")

                 User.findByIdAndUpdate(x.id, { $set: { activated:true } }, (err, us) => {
            if (err) {
                reject(err);
            } else {
                resolve("Account  activated");
                console.log("activation test " )
            }
        });
    });



}
 





module.exports.register  = (user) => {
    return new Promise((resolve, reject) => {
        const user0={}
        User.find({ email: user.email }).then(data => {
            console.log('~######################################## test user ~########################################\n')
            if (data && data.length && data.length > 0) {
                reject("This Email Is Already Taken");
            } else {
                user0.email=user.email
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(user.password, salt);
                let profilePictureUrl = "https://cdn3.iconfinder.com/data/icons/gray-user-toolbar/512/manager-512.png"
                user0.password = hash;
                user0.salt = salt;
                user0.username=user.username;
                user0.isConnected = false;
                user0.profilePictureUrl = profilePictureUrl;
                user0.createdAt = moment().tz("Africa/Tunisia").format();
                user0.last_signIn = moment().tz("Africa/Tunisia").format();
                user0.updatedAt = moment().tz("Africa/Tunisia").format();
                user0.activated = false
                user0.adresse = ""
                user0.code_postal = ""
                user0.ville = ""
                user0.gouvernement = ""
                user0.pays = ""
                user0.backupemail =user.backupemail
                user0.securityquestion=user.securityquestion
                user0.response=user.response
                user0.note = {}
                user0.date_naissance = null
                user0.type_account = ""
                user0.profilePictureUrl = profilePictureUrl
                user0.vapoint = user.vapoint
                //local guide ou agency
                user0.status =user.status 
                user0.Agency_name=  user.Agency_name
                user0.website= user.website,
                user0.facebook =  user.facebook  ,
                user0.tripadvisor=  user.tripadvisor,
                // reach : countries operating in
                user0.reach= user.reach,
                user0.experience_SINCE = user.experience_SINCE,
                user0.accepted= false
                user0.role=user.role 





               /* let payload = {
                    email: user.email,
                    password: user.password
                }
                let token = jwt.sign(payload, process.env.JWT);

 */                 
                
                let newuser = new User(user0);
                console.log("new user"+ newuser)
                newuser.save(function(err, user) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user)

                    }
                });

                let chatuser = {}
                chatuser.owner=newuser._id
                chatuser.messages=[]
                return new Promise((resolve, reject) => {
                    let newchatuser = new chatx(chatuser)
                    newchatuser.save((err, res) => {
                      if(err) reject(err)
                      else {
                        resolve(res)
                      }
                    })
                  })


                




            }
        })
    })
}
 
 