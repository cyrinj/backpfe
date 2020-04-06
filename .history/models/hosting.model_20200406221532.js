var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hostSchema = new Schema({
trip : { title : String},
tripid:String,
hostid:String,
//email:String ,      id user
//date_depart: Date , date d envois
host_nbr: Number ,
workshop: {
    workshp_nbr : Number ,
    logistics_workshop : String ,
    content:String
 } ,
//min_eff: Number,  affichage avec les attribut du trip
max_eff:Number,  //control de saisit front
special_request:String,
motivation :String , 
status: String ,
date_denvois: String

})






var Hosting = mongoose.model('hosting', hostSchema);

module.exports =  Hosting