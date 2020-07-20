// https://socket.io/get-started/chat/
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { hostname } = require('./config/env');
const corsHeaders = require('./middlewares/cors-headers');
const healthcheck = require('./routes/healthcheck');
const socketIoJs = require('./routes/socket-io-js');
const socketIoJsMap = require('./routes/socket-io-js-map');
const ioConnection = require('./routes/io-connection');
const getRooms = require('./routes/api/get-rooms');

const port = 8000;

// HAProxy healthcheck
app.get('/healthcheck', healthcheck);

// CORS headers
app.use(corsHeaders);

// JS client library to work with this server via WebSockets
app.get('/socket.io.js', socketIoJs);
app.get('/socket.io.js.map', socketIoJsMap);

// List rooms
app.get('/api/rooms', getRooms);

// Websocket connection handler
io.on('connection', ioConnection);

http.listen(8000, () => {
    console.log(`listening on ${hostname}:${port}`);
});
