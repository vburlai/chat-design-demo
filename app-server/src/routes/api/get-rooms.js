const { mysqlPrimaryQuery } = require("../../connectors/mysql");

const getRooms = async (req, res) => {
    const result = await mysqlPrimaryQuery("SELECT * FROM chat_rooms");

    res.header('Content-type', 'application/javascript');
    res.send(result);
};

module.exports = getRooms;
