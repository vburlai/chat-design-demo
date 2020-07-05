const fs = require('fs');
const JS_PATH = __dirname + '/../node_modules/socket.io-client/dist/socket.io.js';
const js = fs.readFileSync(JS_PATH, 'utf8');

const socketIoJs = (req, res) => {
    res.header('Content-type', 'application/javascript');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(js);
};

module.exports = socketIoJs;
