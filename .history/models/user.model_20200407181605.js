var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    backupemail: String,
    password: String,
    adresse: String,
    securityquestion:String,
    response:String ,
    code_postal: String,
    ville: String,
    gouvernement: String,
    pays: String,
    telephone: String,
    date_naissance: Date,
    role: String,
    type_account: String,
    profilePictureUrl: String,
    last_signIn: Date,
    last_signOut: Date,
    isConnected: Boolean,
    activated: Boolean,
    createdAt: Date,
    updatedAt: Date,
    linkedAccount: [],
    notification: [],
    note: {},
    //AGENCE ou LOCAL guide
    status:String ,  
    Agency_name: String ,
    URL:{
        website:String ,
        facebook :String,
        tripadvisor: String
    },
   
    //countries the agency activity reach
    reach: [],
    experience_SINCE: Date,
    // blogger profile theme du contenu , ùotivation to join wantotrip 
    theme:String ,
    socialMedia :{
        facebook :String,
        youtube:String ,
        instagram:String

    }
    ,
    motivation:String ,  

    





})

var User = mongoose.model('User', userSchema);

module.exports = User