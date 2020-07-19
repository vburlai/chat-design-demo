const getRooms = async ({ config }) => {
    const { backend } = config;
    const res = await fetch(`${backend}/api/rooms`);
    if (!res.ok) {
        return [];
    }
    const json = await res.json();
    return json;
}

export { getRooms };
