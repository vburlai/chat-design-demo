const { hostname } = require('./env');
const { memcachedAddToArray, memcachedFilterFromArray } = require('./memcached');
const { messageQueueConsume, messageQueueSend } = require('./message-queue');

const roomId = room => `room_${room}`;

const queueId = (clientId) => `client_${clientId}_at_${hostname}`;

const ioConnection = (socket) => {
    socket.on('join', ({ clientId, room }) => {
        const repostMessages = msg => socket.emit('msg', msg.content.toString());

        Promise.resolve()
            .then(() => messageQueueConsume(queueId(clientId), repostMessages))
            .then(() => memcachedAddToArray(roomId(room), { hostname, clientId, room }, 0))
            .then((res) => {
                socket.emit('joined', { clientId, room, hostname: res ? hostname : null });
            });
    });
    socket.on('msg', ({ clientId, room, message }) => {
        console.log('msg', { clientId, room, message });

        messageQueueSend(queueId(clientId), message);
        // get all from room - cache
        // send each one message - MQ
        // send to log topic - MQ
    });
    socket.on('leave', ({ clientId, room, hostname }) => {
        memcachedFilterFromArray(roomId(room), el =>
            el.hostname !== hostname ||
            el.clientId !== clientId ||
            el.room !== room
            , 0); // then()
        // delete fron DB
        // delete message topic - MQ
    });
}

module.exports = ioConnection;
