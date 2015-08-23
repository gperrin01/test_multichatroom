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
  Chatroom.create({
    name                  : 'Toys',
    messages              : []
  }, function(err, room2) {
    if (err) { console.log(err) }
    else { console.log('toys created');}
    Chatroom.create({
      name: 'Art',
      messages: []
    }, function(err, room3){
      if (err) { console.log(err) }
      else { console.log('art created');}
      // exit the code      
      process.exit();
    })
  })
})

