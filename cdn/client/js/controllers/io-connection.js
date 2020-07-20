const socketIoConnect = ({ config }) => {
    const { backend } = config;

    return new Promise(resolve => {
        const socket = io(backend);
        socket.on('connect', () => {
            resolve(socket.connected ? socket : null)
        });
        socket.on('connect_error', (err) => {
            console.log(err);
            resolve(socket.connected ? socket : null);
        });
    });
};

export { socketIoConnect };
