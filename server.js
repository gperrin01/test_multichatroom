/*************************************
// Create the server and prepare socket
*************************************/

var express = require('express');
var app = express();
var http = require('http');
server = http.createServer(app); 

app.use(express.static(__dirname + '/public'));
app.set('/views', './views');
app.set('view engine', 'ejs');

server.listen(8088, function(){
  console.log('listening on port', 8088);
}); 

var io = require('socket.io').listen(server); // see below for all the socket events and messages

/*************************************
// DATABASE
*************************************/
// created a connection to the db from the server
var Chatroom = require('./models').Chatroom;
var bodyParser = require("body-parser");
// body parser config
app.use(bodyParser.urlencoded({ extended: true }));


/*************************************
// ROUTES
*************************************/

// Send names of all chatrooms so they can be listed on the welcome page  
app.get('/', function(req, res){
  Chatroom.find({}, function(err, rooms){
      res.render('index', {rooms: rooms})
  })
});

// add msg to the DB for the room when someone sends a chat
app.post('/:chatroom', function(req, res){
  console.log('req', req.body);
  Chatroom.findOne(
  {name: req.body.room}, function(err, room){
    if (err) console.log(err);
    var time = new Date();
     room.messages.push({name: req.body.name, line: req.body.line, created: time});
    console.log(room.messages);
    room.save();
  })
});

// let admin see chat history for a given room
app.get('/:chatroom', function(req, res){
  console.log('req', req.params.chatroom);
  Chatroom.find({}, function(err, rooms){
    if (err) console.log(err); 
    Chatroom.findOne({name: req.params.chatroom}, function(err, currRoom){
      if (err) console.log(err); 
      var reverseOrderMsg = currRoom.messages.reverse();
      console.log('reverse msg', reverseOrderMsg);
      res.render('admin', {rooms: rooms, currRoomMsg: reverseOrderMsg, roomName: currRoom.name})
    })
  })
})


/*************************************
// SOCKET
*************************************/

io.sockets.on('connection', function(socket) {

  console.log('socket connected');
  // Let's assume a default connection to the "General" room
  socket.room = 'General';
  socket.join(socket.room);
  socket.emit('connected');
  socket.emit('newRoom', socket.room)

  // chat message broddcasted to all members of the current room
  socket.on('chat', function(data) {
    socket.broadcast.to(socket.room).emit('chat', data);
  });

  // leave a room and enter a new one
  socket.on('switchRoom', function(newRoom){
    socket.leave(socket.room);
    socket.room = newRoom;
    socket.join(socket.room);
    console.log('switching to', socket.room)
    socket.emit('newRoom', socket.room)
  })

})