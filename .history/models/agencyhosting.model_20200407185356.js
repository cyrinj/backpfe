var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var agencySchema = new Schema({

tripid:{type:  Schema.Types.ObjectId, ref:'Trip'},
hostid:{type:  Schema.Types.ObjectId, ref:'users'},
note:String,
trip:{title:String}
})






var agency  = mongoose.model('Agency_hosting', agencySchema);

module.exports =  agency