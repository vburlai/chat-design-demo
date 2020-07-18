
function showJoinForm({ config }) {
    document.getElementById('main').innerHTML = `
    <form id="join-form">
        <div class="join-form">
            <div class="join-form-main">
                <div>Join chat:</div>
                <div>
                    <input type="radio" name="room" id="room-1"
                     value="room-1"${config.defaultRoom === 'room-1' ? ' checked' : ''}>
                    <label for="room-1">Room 1</label>
                </div>
                <div>
                    <input type="radio" name="room" id="room-2"
                     value="room-2"${config.defaultRoom === 'room-2' ? ' checked' : ''}>
                    <label for="room-2">Room 2</label>
                </div>
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
