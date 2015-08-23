var REPL = require('repl');
var db = require('./models');

//Remove all documents from the collection;
db.Chatroom.collection.remove();

db.Chatroom.create({
  name: 'General',
  messages: []
}, function(err, room) {
  if (err) { console.log(err) }
  else { console.log('general created');}
  // James likes Mathilda
  db.Chatroom.create({
    name                  : 'Toys',
    messages              : []
  }, function(err, room2) {
    if (err) { console.log(err) }
    else { console.log('toys created');}
    // exit the code      
    process.exit();
  })
})

