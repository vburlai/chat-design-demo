// https://socket.io/get-started/chat/
const app = require('express')();
const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const hostname = process.env['APP_SERVER_HOSTNAME'];
if (!hostname) {
    console.log('APP_SERVER_HOSTNAME env variable is required');
    process.exit(1);
}

const JS_PATH = __dirname + '/../node_modules/socket.io-client/dist/socket.io.js';
const js = fs.readFileSync(JS_PATH, 'utf8');
const port = 8000;

// HAProxy healthcheck
app.get('/healthcheck', (req, res) => {
    res.send("I'm ready");
});

// JS client library to work with this server via WebSockets
app.get('/socket.io.js', (req, res) => {
    res.header('Content-type', 'application/javascript');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(js);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(8000, () => {
    console.log(`listening on *:${port}`);
});
