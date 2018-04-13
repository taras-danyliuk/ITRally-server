const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const {chats, messages} = require('./initialData');


const router = express.Router();
router.use(bodyParser.json());


// CREATES NEW CHAT
router.post('/', function (req, res) {
  let { title } = req.body;

  if(!title) return res.status(401).send("You should pass title");

  const newChat = {
    id: faker.random.number(),
    title
  };

  chats.push(newChat);
  messages[newChat.id] = [];

  res.status(200).json(newChat);
});

// RETURNS ALL CHATS
router.get('/', function (req, res) {
    res.status(200).json(chats);
});

// // DELETES A CATEGORY FROM THE DATABASE
router.delete('/:id', function (req, res) {
  let index = -1;

  chats.forEach((chat, i) => {
    if(chat.id === req.params.id) index = i;
  });

  if(index !== -1) {
    res.status(200).send("Chat "+ chats[index].title +" was deleted.");
    chats.splice(index, 1);
  }
  else {
    res.status(401).send("Chat with id: "+ req.params.id +" not found.");
  }
});

module.exports = router;
