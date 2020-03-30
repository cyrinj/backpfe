const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema ({
  program: String,
  theme: String,
  owner:String,
  continent: String,
  country: String,
  title: String,
  status: String,
  adress:String,
  price: Number,
  
  confirmedByWantotrip:Boolean,
  propositiondeleted:Boolean  
  
});



var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;