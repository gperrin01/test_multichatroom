var REPL = require('repl');
var Chatroom = require('./models').Chatroom;

//Remove all documents from the collection;
Chatroom.collection.remove();

Chatroom.create({
  name: 'General',
  messages: []
}, function(err, room) {
  if (err) { console.log(err) }
  else { console.log('general created');}
  // James likes Mathilda
  Chatroom.create({
    name                  : 'Toys',
    messages              : []
  }, function(err, room2) {
    if (err) { console.log(err) }
    else { console.log('toys created');}
    // exit the code      
    process.exit();
  })
})

