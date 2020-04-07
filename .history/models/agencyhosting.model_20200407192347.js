var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var agencySchema = new Schema({

tripid: String,
hostid:String,
note:String,
trip:{title:String},
date_denvois: String,
last_update :String,
status : String
})






var agency  = mongoose.model('Agency_hosting', agencySchema);

module.exports =  agency