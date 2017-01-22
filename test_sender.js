const sqs = require('./sqs');

const QUEUE_NAME = 'test_queue_2';

const message = process.argv[2];

if (!message) {
    console.log('Message is not provided.');
    process.exit(0);
}

sqs.createQueue({
    QueueName: QUEUE_NAME,
    Attributes: {
        ReceiveMessageWaitTimeSeconds: '20'
    }
}).then((data) => {
    return sqs.sendMessage({
        QueueUrl: data.QueueUrl,
        MessageBody: message
    });
}).then((data) => {
    console.log('Message is sent.');
}).catch((err) => {
    console.error(err);
});
