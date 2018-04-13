const http = require('http');
const socket = require('socket.io');
const express = require('express');
const faker = require('faker');

const {chats, messages} = require('./initialData');
const httpRoutes = require('./httpRoutes');

const PORT = process.env.PORT || 3333;


// Helpers
function chatExists(id) {
  for (let i = 0; i < chats.length; i++) {
    if (chats[i].id === Number(id)) return true;
  }

  return false;
}





// Socket server
const socketServer = http.createServer();
const io = socket(socketServer);

io.on('connection', function(client) {
  const chatId = client.handshake.query.chatId;

  if(!chatExists(chatId)) return console.log(`Chat with id ${chatId} doesn't exist`);
  console.log(`Client connected to chat with id ${chatId}`);

  // Return all messages in history
  client.emit('initialMessages', JSON.stringify(messages[chatId]));

  // Shot random message once in 5 seconds
  const interval = setInterval(() => {
    const newMessage = faker.random.words();
    messages[chatId].push(newMessage);

    client.emit('newMessage', newMessage);
  }, 5000);

  // Add message from client
  client.on('addMessage', function(addMessage) {
    console.log(addMessage, 'addMessage');

    messages[chatId].push(addMessage);
  });

  // Client closed chat
  client.on('disconnect', function(){
    console.log('client disconnected');
    clearInterval(interval);
  });
});

socketServer.listen(PORT, (err) => {
  if (err) return console.log('something bad happened', err);

  console.log(`Socket server is listening on ${PORT}`)
});


// HTTP server
const app = express();

app.use('/chats', httpRoutes);
app.listen(PORT + 1, () => console.log(`HTTP server is listening on ${PORT + 1}`));