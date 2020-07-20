function getQueryParams() {
    const arr = window.location.search.slice(1).split('&');
    let res = {};
    arr.forEach(el => {
        const [name, value] = decodeURIComponent(el).split('=');
        res[name] = value;
    });
    return res;
}

function getConfigFromUrl() {
    const {
        defaultRoom = 'room-1',
        suggestedUsername = 'Anonymous',
        clientId = 'client-0',
        backend = 'http://localhost:3002',
    } = getQueryParams();

    return {
        defaultRoom,
        suggestedUsername,
        clientId,
        backend,
    };
}

export { getConfigFromUrl };
