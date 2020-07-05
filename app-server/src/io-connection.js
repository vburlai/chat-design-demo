const { hostname } = require('./env');
const memcached = require('./memcached');
const { memcachedAddToArray, memcachedFilterFromArray } = require('./memcached');

const ioConnection = (socket) => {
    socket.on('join', ({ clientId, room }) => {
        // create message topic - MQ
        //  on message - send it

        memcachedAddToArray(`room_${room}`, { hostname, clientId, room }, 0)
            // insert to DB
            .then((res) => {
                socket.emit('joined', { clientId, room, hostname: res ? hostname : null });
            });
    });
    socket.on('msg', ({ clientId, room, message }) => {
        console.log('msg', { clientId, room, message });
        // get all from room - cache
        // send each one message - MQ
        // send to log topic - MQ
    });
    socket.on('leave', ({ clientId, room }) => {
        memcachedFilterFromArray(`room_${room}`, el =>
            el.hostname !== hostname ||
            el.clientId !== clientId ||
            el.room !== room
            , 0); // then()
        // delete fron DB
        // delete message topic - MQ
    });
}

module.exports = ioConnection;
