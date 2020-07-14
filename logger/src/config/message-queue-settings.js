const { loggerQueue } = require('./env');

const messageQueueSettings = queue => {
    if (queue === loggerQueue) {
        return {
            durable: true, // persist accross restarts
        };
    }

    if (queue.match(/^mq_.*_at_.*$/)) {
        return {
            durable: false
        };
    }

    throw new Error(`Settings not defined for queue "${queue}"`);
}

module.exports = messageQueueSettings;
