// server.js

const express = require('express');
const SocketServer = require('ws').Server;
var uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data)
  })
}

var clientCount = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  clientCount ++;
  console.log('Client connected');
  wss.broadcast(`${clientCount}`)
  ws.send('Connected to server.')
  ws.on('message', function(data,flags) {
    var bottledMessage = JSON.parse(data)
    console.log(bottledMessage)
     switch(bottledMessage.type) {
      case "postMessage":
        bottledMessage.id = uuid.v4();
        bottledMessage.type = "incomingMessage"
        wss.broadcast(JSON.stringify(bottledMessage))
        break;
      case "postNotification":
        wss.broadcast(JSON.stringify(bottledMessage))
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientCount --;
    console.log(clientCount)
    wss.broadcast(`${clientCount}`)
    });
});