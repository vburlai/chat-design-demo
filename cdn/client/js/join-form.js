function getQueryParams() {
    const arr = window.location.search.slice(1).split('&');
    let res = {};
    arr.forEach(el => {
        const [name, value] = decodeURIComponent(el).split('=');
        res[name] = value;
    });
    return res;
}

function showJoinForm() {
    const { room = 'room-1', username = 'Anonymous', clientId = 'client-0' } = getQueryParams();

    document.getElementById('main').innerHTML = `
    <form id="join-form">
        <div class="join-form">
            <div class="join-form-main">
                <div>Join chat:</div>
                <div>
                    <input type="radio" name="room" id="room-1"
                     value="room-1"${room === 'room-1' ? ' checked' : ''}>
                    <label for="room-1">Room 1</label>
                </div>
                <div>
                    <input type="radio" name="room" id="room-2"
                     value="room-2"${room === 'room-2' ? ' checked' : ''}>
                    <label for="room-2">Room 2</label>
                </div>
                <label class="username" for="username">With username:</label>
                <input type="text" id="username" name="username" />
            </div>
            <div class="join-btn"><input type="submit" value="Join"></div>
        </div>
    </form>
`;
    document.getElementById('username').value = username;

    return new Promise((resolve) => {
        document.getElementById('join-form').addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            resolve({
                clientId,
                room: document.getElementById('join-form').room.value,
                username: document.getElementById('join-form').username.value,
            });
        });
    });
}

export { showJoinForm };
