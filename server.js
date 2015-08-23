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

var io = require('socket.io').listen(server);

server.listen(8080, function(){
  console.log('listening on port', 8080);
}); 


/*************************************
// ROUTES
*************************************/

app.get('/', function(req, res){
  res.render('index')
})