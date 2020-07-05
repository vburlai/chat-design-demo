const { hostname } = require('./env');
const memcached = require('./memcached');
const { memcachedAddToArray, memcachedFilterFromArray } = require('./memcached');

// let sockets = new Map();
// const getHash = (hostname, clientId, chat) => `${hostname}:${clientId}:${chat}`;

const ioConnection = (socket) => {
    socket.on('join', ({ clientId, chat }) => {
        // sockets.set(getHash(hostname, clientId, chat), socket);
        // create message topic - MQ
        //  on message - send it

        memcachedAddToArray(`chat_${chat}`, { hostname, clientId, chat }, 0); // .then();
        // insert to DB
    });
    socket.on('msg', ({ clientId, chat, message }) => {
        // get all from chat - cache
        // send each one message - MQ
        // send to log topic - MQ
    });
    socket.on('leave', ({ clientId, chat }) => {
        // sockets.delete(getHash(hostname, clientId, chat));
        memcachedFilterFromArray(`chat_${chat}`, el =>
            el.hostname === hostname &&
            el.clientId === clientId &&
            el.chat === chat
            , 0); // then()
        // delete fron DB
        // delete message topic - MQ
    });
}

module.exports = ioConnection;
