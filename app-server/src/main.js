// https://socket.io/get-started/chat/
const app = require('express')();
const healthcheck = require('./healthcheck');
const socketIoJs = require('./socket-io-js');
const { hostname } = require('./env');
const ioConnection = require('./io-connection');
const corsHeaders = require('./cors-headers');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8000;

// HAProxy healthcheck
app.get('/healthcheck', healthcheck);

// CORS headers
app.use(corsHeaders);

// JS client library to work with this server via WebSockets
app.get('/socket.io.js', socketIoJs);

// Websocket connection handler
io.on('connection', ioConnection);

http.listen(8000, () => {
    console.log(`listening on ${hostname}:${port}`);
});
