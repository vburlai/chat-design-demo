const { messageQueueConsume } = require("./connectors/message-queue");
const { loggerQueue } = require("./config/env");
const { mysqlPrimaryQuery } = require("./connectors/mysql");

let numRetries = 10;

function listen() {
    messageQueueConsume(loggerQueue, msg => {
        const json = msg.content.toString();
        console.log('json', json);
        const { room, message } = JSON.parse(json);
        mysqlPrimaryQuery('INSERT INTO messages SET ? ', { room, message })
            .then(() => {
                console.log('Message logged to Primary DB');
            })
    }).catch(err => (--numRetries) ? setTimeout(listen, 10000) : null);
}

listen();
