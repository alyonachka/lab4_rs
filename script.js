const amqp = require('amqplib');

const QUEUE_NAME = 'messages';

async function sendMessage(message) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    console.log(`Отправлено: ${message}`);

    setTimeout(() => {
        connection.close();
    }, 500);
}

async function receiveMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log('Ожидание сообщений...');

    channel.consume(QUEUE_NAME, (msg) => {
        console.log(`Получено: ${msg.content.toString()}`);
    }, { noAck: true });
}

const action = process.argv[2];
if (action === 'send') {
    sendMessage(process.argv[3] || 'Тестовое сообщение');
} else if (action === 'receive') {
    receiveMessages();
} else {
    console.log('Использование: node script.js send "сообщение" или node script.js receive');
}
