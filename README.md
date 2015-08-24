## Multi-channel chat app for a code test

The app uses Node.js, Socket.io and MongoDB with Mongoose.

Before running the app please run`node seeds.js` to create three chatrooms in the Database. The server is configured to automatically connect the user to the 'General' chatroom, which is one of the three seed classrooms.

Run `node server.js` to start the app on localhost:8088

### Choose your chatroom

The left-hand part of the screen shows the list of chatrooms currently available in the database. Click on one to join it, or use the form below to create a new one. As you join a room, the chat area on the right-hand side is emptied and the server writes a welcome message in the room confirming your successful connection.

### Send a chat

Use the form at the bottom of the chat area to send a chat message. Chat messages sent will be broadcasted to any current member of that chatroom. Most recent messages are at the bottom of the screen so they are always visible as you type an answer. An `overflow hidden` and `$("#messages-list").scrollTop($("#messages-list")[0].scrollHeight);` ensure recent messages are always visible and older ones are hidden, but can be accessed by a simple scroll up the div.

In the current absence of login, you will need to enter your username first. Without username, no message is sent and an alert is triggered. Once a message is sent with a username, you cannot change the username unless you refresh the page.

### Access the chat history

Navigate to `localhost:8088/:chatroomname` to see the chat history for a given classroom (beware of uppercase for the first letter of the room name).
Messages will be listed in reverse of timestamp, i.e. recent messages at the top of the page. Each message also shows the sender's username as well as the timestamp in a smaller font-size on the side.
I have not yet implemented the administrator login so anyone can visit this page.

Note: as I was about to push the code, I noticed the messages in the history do not scroll down the div nicely as they do in the normal chat. I think it is because I used EJS to iterate through the messages and could not add the same `scrollTop / scrollHeight` function as above.

### Front-end

I saw MyMiniFactory uses Foundation but I used Bootstrap as it is the one I have some experience with.
I took the background-color of the body from your website, and took the googlefonts from your header too.

Given the relative simplicity of the front-end I chose not to use a front-end framework (I learnt Backbone). To append a new chat message or chatroom to their respective lists, I simply used jQuery (I only need one function written in 2 lines so I did not even think Mustache or Underscore templating were necessary either). To automatically get the lists of chatrooms on page refresh and display the chat histories, I used EJS and a basic loop to add as many `<li>` as needed.
