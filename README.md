# ITRally-server
Run `npm start` to start http and socket servers.

#### HTTP server has:
 - `GET` `/chats` url, which returns list of all chats;
 - `POST` `/chats` url, which adds chat (you need to pass `title` in post body);
 - `DELETE` `/chats/:id` url, which deletes chat by id.

#### Socket server:
 - requires connection with query params `chatId` (example: `io('http://localhost?chatId=123')`);
 - server emits `initialMessages` with all messages in history, when socket connection was successful;
 - server emits `newMessage` once in 5 seconds with random new message;
 - server can receive `addMessage` event with single `String` parameter, this `String` parameter (message) will be added to all messages.
 
 HTTP server default port is `3334`. Socket server default port is `3333`.
