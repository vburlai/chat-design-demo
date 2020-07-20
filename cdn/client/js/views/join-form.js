
function showJoinForm({ config, chatRooms }) {
    const rooms = chatRooms.map(({ room_id, name }) => `
    <div>
        <input type="radio" name="room" id="${room_id}"
            value="${room_id}"${config.defaultRoom === room_id ? ' checked' : ''}>
        <label for="${room_id}">${name}</label>
    </div>
    `);

    document.getElementById('main').innerHTML = `
    <form id="join-form">
        <div class="join-form">
            <div class="join-form-main">
                <div>Join chat:</div>
                ${rooms.join('\n')}
                <label class="username" for="username">With name:</label>
                <input type="text" id="username" name="username" tabindex="0" />
            </div>
            <div class="join-btn"><input type="submit" value="Join"></div>
        </div>
    </form>
`;
    document.getElementById('username').value = config.suggestedUsername;

    return new Promise((resolve) => {
        document.getElementById('join-form').addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            resolve({
                room: document.getElementById('join-form').room.value,
                username: document.getElementById('join-form').username.value,
            });
        });
    });
}

export { showJoinForm };
