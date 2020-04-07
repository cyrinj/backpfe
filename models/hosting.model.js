var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hostSchema = new Schema({

tripid:{type:  Schema.Types.ObjectId, ref:'Trip'},
hostid:{type:  Schema.Types.ObjectId, ref:'users'},
email:String ,
date_depart: Date ,
host_nbr: Number ,
workshop: {
    workshp_nbr : Number ,
    logistics_workshop : String ,
    content:String
 } ,
min_eff: Number,
max_eff:Number,
special_request:String,
motivation :String , 
status: String 

})






var Hosting = mongoose.model('hosting', hostSchema);

module.exports =  Hosting