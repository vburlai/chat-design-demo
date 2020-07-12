const { hostname } = require('./env');
const { postToChatRoom, removeChatRoomMember, addChatRoomMember } = require('./chat-rooms');

const repostMsg = socket => msg => socket.emit('msg', msg.content.toString());
const ioConnection = (socket) => {
    socket.on('join', msg =>
        addChatRoomMember(msg.room, msg, repostMsg(socket))
            .then(() => socket.emit('joined', { ...msg, hostname }))
    );
    socket.on('msg', ({ room, message }) => postToChatRoom(room, message));
    socket.on('leave', msg => removeChatRoomMember(msg.room, msg));
}

module.exports = ioConnection;
