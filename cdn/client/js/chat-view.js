function showChatView({ config, hostname, room, username, socket, chatRooms }) {
    const [{ name: roomTitle }] = chatRooms.filter(({ room_id }) => room_id === room);

    const info1 = 'Client gets unique ID when connecting to server. ' +
        'For demo purposes we\'ve hard-coded client IDs in the URLs. ' +
        'They correspond to elements in system design chart.';

    const info2 = 'We have WebSocket connection through load balancer to this server.';

    document.getElementById('main').innerHTML = `
    <form id="chat-form">
        <div class="chat-title" data-room="${room}">
            <div class="text">${roomTitle}</div>
            <button id="leave-chat" type="reset">x</button>
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
            <button id="load-msgs" type="reset">Load All Messages</button>
            <div id="msgs">Joined ${roomTitle}</div>
            <div class="send-msg">
                <input type="text" id="chat-msg" name="msg" placeholder="Input message here" autocomplete="off" tabindex="0">
                <input type="submit" value="Send">
            </div>
        </div>
    </form>
`;

    document.getElementById('chat-msg').focus();

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

    document.getElementById('load-msgs').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        document.getElementById('load-msgs').disabled = true;
        document.getElementById('msgs').innerHTML = 'Loading...';

        setTimeout(() => socket.emit('load-msgs', { room }), 1000);

        socket.once('msgs-loaded', ({ messages }) => {
            const el = document.getElementById('msgs');
            el.innerHTML = messages.join('<br>');
            el.scrollTop = el.scrollHeight - el.offsetHeight;
            document.getElementById('load-msgs').disabled = false;
        });
    });

    socket.on('msg', msg => {
        const el = document.getElementById('msgs');
        el.innerHTML += `<br>${msg}`;
        el.scrollTop = el.scrollHeight - el.offsetHeight;
    });

    return new Promise((resolve) => {
        document.getElementById('leave-chat').addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            socket.emit('leave', {});
            socket.off();
            resolve();
        });
    });
}

export { showChatView };