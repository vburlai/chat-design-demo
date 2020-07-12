const { hostname } = require('./env');
const { messageQueueConsume, messageQueueSend } = require('./message-queue');
const { memcachedAddToArray, memcachedFilterFromArray } = require('./memcached');

const roomId = room => `room_${room}`;
const queueId = (clientId) => `client_${clientId}_at_${hostname}`;

const getChatRoomMembers = async (room) => {
    return [{ clientId: 'client-1' }]
};

const addChatRoomMember = async (room, member, consumerFn) => {
    const { clientId } = member;
    const entry = { hostname, clientId, room };
    await messageQueueConsume(queueId(clientId), consumerFn);
    await memcachedAddToArray(roomId(room), entry, 0);
};

const postToChatRoom = async (room, message) => {
    const members = await getChatRoomMembers(room);
    await Promise.all(members.map(
        ({ clientId }) => messageQueueSend(queueId(clientId), message)
    ))
    // send to log topic - MQ
}

const removeChatRoomMember = async (room, member) => {
    await memcachedFilterFromArray(roomId(room), el =>
        el.clientId !== member.clientId ||
        el.hostname !== hostname ||
        el.room !== room
        , 0)
    // delete fron DB
    // delete message topic - MQ
};

module.exports = { getChatRoomMembers, addChatRoomMember, postToChatRoom, removeChatRoomMember };
