const express = require('express');
const app = express();
const websocket = require('ws');
const http = require('http');

const server = http.createServer(app);
const wss = new websocket.Server({ server });

app.get('/', (req, res) => {
  res.send('WebSocket server is running');

});

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === websocket.OPEN) {
                client.send(`echo: ${message}`);
            }
        });

    });

});

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});