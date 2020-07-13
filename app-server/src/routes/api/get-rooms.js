const { getChatRooms } = require("../../controllers/chat-rooms");

const getRooms = async (req, res) => {
    const result = await getChatRooms();

    res.header('Content-type', 'application/javascript');
    res.send(result);
};

module.exports = getRooms;
