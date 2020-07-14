const amqp = require('amqplib');

const { messageQueueAddr, mqUsername, mqPassword } = require('../config/env');
const messageQueueSettings = require('../config/message-queue-settings');

let messageQueueConnection = null;
let messageQueue = null;

const messageQueueConnect = async () => {
    if (!messageQueue) {
        messageQueueConnection = await amqp.connect(`amqp://${mqUsername}:${mqPassword}@${messageQueueAddr}`);
        messageQueueConnection.on('close', () => {
            messageQueueConnection = null;
            messageQueue = null;
        })
        messageQueue = await messageQueueConnection.createChannel();
    }
    return messageQueue;
}

const messageQueueCreate = async (mq, queue) => {
    return mq.assertQueue(queue, messageQueueSettings(queue));
}

const messageQueueConsume = async (queue, fn) => {
    const mq = await messageQueueConnect();
    await messageQueueCreate(mq, queue);
    return mq.consume(queue, fn);
}

const messageQueueDelete = async (queue) => {
    const mq = await messageQueueConnect();
    return mq.deleteQueue(queue);
}

module.exports = { messageQueueConsume, messageQueueDelete };
