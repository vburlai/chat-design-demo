const fs = require('fs');
const MAP_PATH = __dirname + '/../../node_modules/socket.io-client/dist/socket.io.js.map';
const map = fs.readFileSync(MAP_PATH, 'utf8');

const socketIoJsMap = (req, res) => {
    res.header('Content-type', 'application/json');
    res.send(map);
};

module.exports = socketIoJsMap;
