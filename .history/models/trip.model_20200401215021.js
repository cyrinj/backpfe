const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema ({
  program: [],
  theme: String,
  owner:String,
  month:String,
  draft :Boolean,
  continent: String,
  country: String,
  inspiration:String,
  agencyname:String,
  agencyemail:String,
  agencynumber:Number,
  duration:Number,
  bestperiode1:String,
  try1:String,
  title: String,
  from:String,
  to:String,
  description: String,
  maps: {
    latitude: String,
    longitude: String
  },
  typeTrip: String,
  status: String,
  destination: String,
  date_from: Date,
  date_to: Date,
  Days: Array,
  spotedIn: Number,
  spotedOut: Number,
  price: Number,
  included: Array,
  exclusion: Array,
  confirmedByWantotrip: Boolean,
  updateByTripper: Boolean,
  productionTrip: Boolean,
  latestVersion: Object,
  agency: Object,
  propositiondeleted: Boolean,
  blogger: {
    idUser: {type:  Schema.Types.ObjectId, ref:'User'},
    first_name: String,
    last_name: String,
    username: String,
    pictureUrl: String
  },
  pictures: {
    cover: String,
    other: Array,
    area: Array
  },
  participants: [
    {
      idUser: {type:  Schema.Types.ObjectId, ref:'User'},
      first_name: String,
      last_name: String,
      username: String,
      pictureUrl: String
    }
  ],
});



var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;