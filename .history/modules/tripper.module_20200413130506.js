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



/*module.exports. updatetrip = ( id ,x) => {
    return new Promise((resolve, reject) => {
         console.log("id :" +id)
       trip.find({ '_id': id }).then(data => {
             console.log("DATA :    "+data)
            let tripp = data[0]
            tripp=x
            console.log("/////////////////////////////////")
            console.log("tripp id : " + tripp._id)
         trip.findOneAndUpdate({ '_id': tripp._id }, tripp, { new: true }).then(dt => {
                console.log("dt result " + dt)
                resolve(dt)
            }) 
        }).catch((err) => {
            reject(err+ "problem update ") 

    })


    })}*/


    module.exports.allmessagesbyadmin = (id) => {
   console.log("fffgg",id)
        return new Promise((resolve, reject) => {
            chatx.find({ owner: id } ).then(data => {
                //  chatx.find({ owner: id }).then(data => {
                if (data !== null) {
                    console.log("hhh", data)
                    resolve(data)
                    
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

module.exports.updatetrip = (x) => {
    return new Promise((resolve, reject) => {

        trip.find({ '_id': x._id }).then(data => {

            let newtrp = data[0]
            newtrp.title = x.title
            newtrp.continent = x.continent
            newtrp.country = x.country
            newtrp.theme = x.theme
            newtrp.duration = x.duration
            newtrp.from = x.from
            newtrp.to = x.to
            newtrp.program = x.program
            newtrp.inspiration = x.inspiration
            newtrp.agencyname = x.agencyname
            newtrp.agencyemail = x.agencyemail
            newtrp.agencynumber = x.agencynumber
            newtrp.price = x.price
            newtrp.program = x.program
            newtrp.draft= x.draft

            trip.findOneAndUpdate({ '_id': newtrp._id }, newtrp, { new: true }).then(dt => {
                //   console.log("dt result " + dt)
                resolve(dt)
            })
        }).catch((err) => {
            reject(err + "problem update ")

        })


    })
}


module.exports.annulertriproposition = (id) => {
    return new Promise((resolve, reject) => {
        trip.findByIdAndUpdate(id, { $set: { propositiondeleted: true } }, (err, res) => {
            if (err) {
                reject(err);
            } else {

                resolve("proposition annulée");

            }
        });



    }
    )
}

module.exports.subform = (tokenid, x) => {
    return new Promise((resolve, reject) => {
        const trip1 = {}
        // console.log("vvvvvvvvvvvvvvvvvvv",trip)         
       // trip1.title = "Trip " + x.country + " with Wantotrip family"
       trip1.title = x.title
        trip1.owner = tokenid
        // console.log("this",trip1)
        trip1.continent = x.continent
        trip1.country = x.country
        trip1.theme = x.theme
        trip1.duration = x.duration
        trip1.from = x.from
        trip1.to = x.to
        trip1.bestperiode1 = x.bestperiode1
        trip1.duration = x.duration
        trip1.try1 = x.try1
        trip1.program = x.program
        trip1.inspiration = x.inspiration
        trip1.agencyname = x.agencyname
        trip1.agencyemail = x.agencyemail
        trip1.agencynumber = x.agencynumber
        trip1.price = x.price
        trip1.confirmedByWantotrip = false
        trip1.propositiondeleted = false
        trip1.month = x.month
        trip1.status = "on hold"
        console.log(trip1)
trip1.draft=x.draft
trip1.date_suggestion=moment().tz("Africa/Tunisia").format()
console.log(trip1)
        let newtrip = new trip(trip1);
        newtrip.save(function (err, trip1) {
            if (err) {
                reject(err);
            } else {
                // console.log(newtriptrip)
                resolve(trip1)

            }
        });

        User.findByIdAndUpdate(tokenid,
            {
                $push: { trips: newtrip }
            }, { new: true }).then(user => {
                console.log("check the trips attrib" + user)
                resolve(user)

            }).catch(err => {
                console.log(' add trip  err ', err)
                reject(err);
            });
    })
}

module.exports.ajouterMessage = (username,chatid ,message) => {
    
    return new Promise((resolve, reject) => {
         console.log("sssssssss",chatid)
         newchat= {}
             /* chatx.findById(chatid).then(data=>{
                console.log("hey you", data)  
                newchat=data
              })*/  
             
                  chatx.findById( chatid ).then(data => {
              
                 console.log("f1",data)
                 newchat=data
                 objmessage = {}
                 objmessage.sender=username
                 objmessage.contenu=message
                 newchat.messages.push(objmessage)
                 chatx.findOneAndUpdate({ _id: chatid }, newchat).then(response => {
                    console.log("hhj",response)
                })
               /*  chatx.findByIdAndUpdate(chatid,  
                    {
                         $push: { chats: newchat  }  }).then(data => {
                        console.log("check the chat attrib"+ data)
                        resolve(data)
       
            }) .catch(err => {
                console.log(' add activity  err ', err)
                reject(err);
            });*/
                 // console.log("heyyy you",newchat)

                //  newchat.messages=data.messages
                  
              }).catch(err => {
                console.log(' add activity  err ', err)
                reject(err);
            })

            })
              
              


            
   // console.log("hhjj",newchat.messages)
         /*    newchat.messages.push(message)
  
                chatx.findByIdAndUpdate(chatid,  
                    {
                         $push: { chats: newchat  }  }, { new: true }).then(data => {
                        console.log("check the chat attrib"+ data)
                        resolve(data)
       
            }) .catch(err => {
                console.log(' add activity  err ', err)
                reject(err);
            });  */

           

  
    }

module.exports.subactivity = (tokenid, x) => {
    return new Promise((resolve, reject) => {
        //    console.log("sssssssss",tokenid)
        const activity1 = {}
        //  console.log('~######################################## test activity ~########################################\n')

        activity1.title = x.title
        activity1.owner = tokenid
        activity1.continent = x.continent
        activity1.country = x.country
        activity1.theme = x.theme
        activity1.program = x.program
        activity1.adress = x.adress
        activity1.price = x.price
        activity1.confirmedByWantotrip = false
        activity1.propositiondeleted = false
        // console.log("ppppppppppppppppp") 
        let newactivity = new activity(activity1);

        newactivity.save(function (err, activity1) {
            if (err) {
                reject(err);
            } else {
                resolve(activity1)

            }
        });

        User.findByIdAndUpdate(tokenid,
            {
                $push: { activitys: newactivity }
            }, { new: true }).then(user => {
                console.log("check the activitys attrib" + user)
                resolve(user)

            }).catch(err => {
                console.log(' add activity  err ', err)
                reject(err);
            });

    })
}


module.exports.editphoto_de_profil=(id, urlBD) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id,
            {
                $set: {
                    profilePictureUrl:urlBD
                    
                }
            }, { new: true }).then(user => {
                resolve(user)
            }).catch(err => {
              
                reject(err);
            });
         })
}

/*
module.exports.editprofile = (token, x) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(token.id,
            {
                $set: {
                    first_name: x.first_name,
                    last_name: x.last_name,
                    username: x.username,
                    email: x.email,
                    //  password: x.password,
                    adresse: x.adresse,
                    code_postal: x.code_postal,
                    ville: x.ville,
                    gouvernement: x.gouvernement,
                    pays: x.pays,
                    telephone: x.telephone,
                    date_naissance: x.date_naissance
                }
            }, { new: true }).then(user => {
               
                resolve(user)




            }).catch(err => {
              
                reject(err);
            });


    })

}*/




module.exports.editprofile = (token,x,filename) => {
    console.log("filename",filename)
    return new Promise((resolve, reject) => {
        console.log("test edit profile token.id =  "+token.id)
        User.findByIdAndUpdate(token.id,   
            {
                $set: {
                    
                    profilePictureUrl:"http://localhost:3000/uploads/"+token.id+"/"+filename, 
                    first_name: x.first_name,
                        last_name: x. last_name,
                        username: x.  username,
                        email: x. email,
                        password: x.  password,
                        adresse: x.adresse,
                        code_postal: x.   code_postal,
                        ville: x. ville,
                        gouvernement: x.gouvernement,
                        pays: x. pays,
                        telephone: x. telephone,
                        date_naissance: (x.date_naissance)
                } }, { new: true }).then(user => {
                console.log("test edit profile !!! "+ user)
                resolve(user)




    }) .catch(err => {
        console.log(' edit profile err ', err)
        reject(err);
    });


})

}

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
  


module.exports.changepassword_in = (token, x) => {
    return new Promise((resolve, reject) => {
        // console.log("test edit profile token.id =  "+token.id)
        //  console.log("ffffffff",x.password)

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(x.password, salt);
        // console.log("jjjjjjjjj",hash)
        User.findByIdAndUpdate(token.id,
            {
                $set: {
                    password: hash,
                }
            }, { new: true }).then(user => {
                //  console.log("test edit profile !!! "+ user)
                resolve(user)




            }).catch(err => {
                console.log(' edit profile err ', err)
                reject(err);
            });


    })

}


module.exports.allmessagesbyuser = (id) => {

    return new Promise((resolve, reject) => {
        chatx.find({ owner: id }).then(data => {
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


module.exports.allchatsforadmin = () => {

    return new Promise((resolve, reject) => {
        chatx.find().then(data => {
            //  chatx.find({ owner: id }).then(data => {
            if (data !== null) {
                resolve(data)
                console.log("hhh", data)
            }
            else {
              //  console.log("hhh")
                reject("no chat found")
            }
        })
            .catch(err => {
                console.log(' getting chats by admin error ', err)
                reject(err);
            })

    })
}


module.exports.alltripsbyuser = (id) => {
    return new Promise((resolve, reject) => {

        trip.find({ owner: id, propositiondeleted: false , draft:false}).then(data => {
            if (data !== null && data.length && data.length > 0) {
                resolve(data)
            }
            else {
                reject("no trips found")
            }



        })
            .catch(err => {
                console.log(' getting trips du user error ', err)
                reject(err);
            })

    })
}

module.exports.alltripdraftsbyuser = (id) => {
    return new Promise((resolve, reject) => {

        trip.find({ owner: id, propositiondeleted: false, draft:true}).then(data => {
            if (data !== null && data.length && data.length > 0) {
                resolve(data)
            }
            else {
                reject("no trips found")
            }
        })
            .catch(err => {
                console.log(' getting trips du user error ', err)
                reject(err);
            })
      })
}



module.exports.getInfoFromToken = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(token);
        User.find({ email: decoded.email }).then(data => {
            if (data && data.length && data.length > 0) {
                resolve(data[0])
            } else {
                reject('user not Founnd')
            }
        })
    });
}

module.exports.profile = (token) => {
    return new Promise((resolve, reject) => {

        console.log('test profile trip ', token)
        User.find({ email: token.email }).then(data => {

            resolve(data)




        }).catch(err => {
            console.log('test err ', err)
            reject(err);
        });
    })
}

