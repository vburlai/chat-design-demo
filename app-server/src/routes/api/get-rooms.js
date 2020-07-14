const { getChatRooms } = require("../../controllers/chat-rooms");

const getRooms = async (req, res, next) => {
    try {
        const result = await getChatRooms();

        res.header('Content-type', 'application/javascript');
        res.send(result);
    } catch (err) {
        next(err);
    }
};

module.exports = getRooms;
