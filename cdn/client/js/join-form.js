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
    const { chat = 'chat-1', username = 'Anonymous', clientId = 'client-0' } = getQueryParams();

    document.getElementById('main').innerHTML = `
    <form id="join-form">
        <div class="join-form">
            <div class="join-form-main">
                <div>Join chat:</div>
                <div>
                    <input type="radio" name="chat" id="chat-1"
                     value="chat-1"${chat === 'chat-1' ? ' checked' : ''}>
                    <label for="chat-1">Chat 1</label>
                </div>
                <div>
                    <input type="radio" name="chat" id="chat-2"
                     value="chat-2"${chat === 'chat-2' ? ' checked' : ''}>
                    <label for="chat-2">Chat 2</label>
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
                chat: document.getElementById('join-form').chat.value,
                username: document.getElementById('join-form').username.value,
            });
        });
    });
}

export { showJoinForm };
