var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/chatsdatabase");

var ChatroomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  messages: []
});

var Chatroom = mongoose.model('Chatroom', ChatroomSchema);
module.exports.Chatroom = Chatroom;