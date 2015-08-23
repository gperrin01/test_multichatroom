/*************************************
// Create the server and prepare socket
*************************************/

var express = require('express');
var app = express();
var http = require('http');
server = http.createServer(app); 
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.set('/views', './views');
app.set('view engine', 'ejs');

var io = require('socket.io').listen(server); // see below for all the socket events and messages

server.listen(8080, function(){
  console.log('listening on port', 8080);
}); 


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

  // Let's assume a default connection to the "General" room
  socket.room = 'general';
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
    socket.emit('newRoom', socket.room)
  })