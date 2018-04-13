const faker = require('faker');


const chats = [{
  id: faker.random.number(),
  title: "Secret Room",
}, {
  id: faker.random.number(),
  title: "Only Heroes",
}, {
  id: faker.random.number(),
  title: "Chack Norris' funs",
}, {
  id: faker.random.number(),
  title: "Don't click here!",
}];

const messages = {};

chats.forEach(chat => {
  messages[chat.id] = [];

  for(let i = 0; i < 100; i++) {
    messages[chat.id].push(faker.random.words());
  }
});


module.exports.chats = chats;
module.exports.messages = messages;