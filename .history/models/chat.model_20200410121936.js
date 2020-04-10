const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema ({
  messages: [],
  // id
  owner:String,
 

  });



var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;