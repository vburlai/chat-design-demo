const { hostname } = require('./env');

let sockets = new Map();
const getHash = (hostname, clientId, chat) => `${hostname}:${clientId}:${chat}`;

const ioConnection = (socket) => {
    socket.on('join', ({ clientId, chat }) => {
        sockets.set(getHash(hostname, clientId, chat), socket);
        // create message topic - MQ
        //  on message - send it
        // read chat - cache
        // write chat - cache
        // insert to DB
    });
    socket.on('msg', ({ clientId, chat, message }) => {
        // get all from chat - cache
        // send each one message - MQ
        // send to log topic - MQ
    });
    socket.on('leave', ({ clientId, chat }) => {
        sockets.delete(getHash(hostname, clientId, chat));
        // read chat - cache
        // write chat - cache
        // delete fron DB
        // delete message topic - MQ
    });
}

module.exports = ioConnection;
