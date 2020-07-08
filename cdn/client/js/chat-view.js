const title = {
    'room-1': 'Room 1',
    'room-2': 'Room 2',
}

function showChatView({ config, hostname, room, username, socket }) {
    const info1 = 'Client gets unique ID when connecting to server. ' +
        'For demo purposes we\'ve hard-coded client IDs in the URLs. ' +
        'They correspond to elements in system design chart.';

    const info2 = 'We have WebSocket connection through load balancer to this server.';

    document.getElementById('main').innerHTML = `
    <form id="chat-form">
        <div class="chat-title" data-room="${room}">
            <div class="text">${title[room]}</div>
            <button id="leave-chat">x</button>
        </div>
        <div class="chat-wrapper">
            <div>
                <span class="info" title="${info1}">i</span>
                <span> clientId: ${config.clientId}</span>
            </div>
            <div>
                <span class="info" title="${info2}">i</span>
                <span> Server: ${hostname}</span>
            </div>
            <div class="msgs">Messages</div>
            <div class="send-msg">
                <input type="text" id="chat-msg" name="msg" placeholder="Input message here" autocomplete="off">
                <input type="submit" value="Send">
            </div>
        </div>
    </form>
`;
    document.getElementById('chat-form').addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        socket.emit('msg', {
            clientId: config.clientId,
            room,
            message: `${username}: ${document.getElementById('chat-msg').value}`,
        });
        document.getElementById('chat-msg').value = '';
    });

    socket.on('msg', msg => console.log(msg));

    return new Promise((resolve) => {
        document.getElementById('leave-chat').addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            socket.emit('leave', { clientId: config.clientId, room, hostname });
            resolve();
        });
    });
}

export { showChatView };