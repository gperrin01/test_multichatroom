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

server.listen(8080, function(){
  console.log('listening on port', 8080);
}); 

var io = require('socket.io').listen(server); // see below for all the socket events and messages

/*************************************
// DATABASE
*************************************/
// created a connection to the db from the server
var db = require('./models');
var bodyParser = require("body-parser");
// body parser config
app.use(bodyParser.urlencoded({ extended: true }));


/*************************************
// ROUTES
*************************************/

app.get('/', function(req, res){
  res.render('index')
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