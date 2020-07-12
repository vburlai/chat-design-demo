const fs = require('fs');
const JS_PATH = __dirname + '/../node_modules/socket.io-client/dist/socket.io.js';
const js = fs.readFileSync(JS_PATH, 'utf8');

const socketIoJs = (req, res) => {
    res.header('Content-type', 'application/javascript');
    const origin = req.get('Origin');
    if (origin === 'http://localhost:3001' || origin === 'http://127.0.0.1:3001') {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.send(js);
};

module.exports = socketIoJs;
