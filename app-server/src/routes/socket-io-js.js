const fs = require('fs');
const JS_PATH = __dirname + '/../../node_modules/socket.io-client/dist/socket.io.js';
const js = fs.readFileSync(JS_PATH, 'utf8');

const socketIoJs = (req, res) => {
    res.header('Content-type', 'application/javascript');
    res.send(js);
};

module.exports = socketIoJs;
