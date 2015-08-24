var socket = io.connect('http://localhost:8088');

$(document).ready(function() {
  socketEvents();
  $('#write_msg form').on('submit', sendChatMessage);
  $('#chatroom_list').on('click', 'a', switchChatRoom);
  $('#create_room').on('submit', createRoom);
})

/*************************************
// CHAT FUNCTIONS
*************************************/

function sendChatMessage() {
  console.log('emitted a chat');
  event.preventDefault();

  var name = $('#nick');
  var line = $('#text');
  var room = $('.highlight > a').attr('data-room');
  console.log('/'+room);
  // only send the msg if user has put a username
  // in the current absence of login, once the username input has been set once, it will be disabled until the page is refreshed
  if (name.val() !== ''){
    var data = {name: name.val(), line: line.val(), room: room};
    socket.emit('chat', data);
    writeLine(name.val(), line.val());
    line.val("");
    name.attr('disabled', true);

    // add chat message to the database
    $.post('/chatrooms/' + room, data, function(response){
      console.log('response post', response);
    })
  }
  else { alert('Please enter a username')};
};

function switchChatRoom() {
  var newRoom = $(this).attr('data-room');
  // only emit the msg if clicked on the non-active room
  if ( newRoom !== $('.highlight > a').attr('data-room') ){
    console.log('emit switchRoom');
    socket.emit('switchRoom', newRoom)
  }
}
function writeLine(name, line) {
  $('#chatlines').append('<li class="talk"><span class="nick">&lt;' + name + '&gt;</span> ' + line + '</li>');
  $("#messages-list").scrollTop($("#messages-list")[0].scrollHeight);
  // this works because I have the overflow set as hidden in CSS
}

function highlightRoom(room){
  $("#chatroom_list li").removeClass('highlight');
  $("#chatroom_list a[data-room='" + room + "']").parent().addClass('highlight');
}

function createRoom(){
  event.preventDefault();
  var room = $('#new_room').val();
  $.post('/chatrooms', {room: room}, function(response){
    // add new room to the list and ready to add msg to it
    var li = '<li><a href="#" data-room="' + response.name + '">' + response.name + '</a></li>';
    $('#chatroom_list ul').append(li);
  })
}

/*************************************
// SOCKET
*************************************/

function socketEvents(){

  socket.on('connected', function(room) {
    console.log('connected');
    $('input').attr('disabled', false);
  });

  socket.on('newRoom', function(newRoom){
    // only do so when server confirms the change of newRoom
    // empty the chat lines and add "welcome mssg"
    $('#chatlines').empty();
    var msg = 'Welcome to the ' + newRoom + ' room.';
    writeLine('Server', msg);
    // highlight the new newRoom
    highlightRoom(newRoom);
  });

  socket.on('chat', function(data) {
    writeLine(data.name, data.line);
  });
}