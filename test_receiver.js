const sqs = require('./sqs');

const QUEUE_NAME = 'test_queue_2';

function receiveMessage(queueUrl) {
    sqs.receiveMessage({
        AttributeNames: [
            'All'
        ],
        MessageAttributeNames: [
            'All'
        ],
        VisibilityTimeout: 0,
        QueueUrl: queueUrl
    }).then((data) => {
        const message = data.Messages[0].Body;
        console.log('Message is received: ', message);
        return receiveMessage(queueUrl);
    });
}

sqs.createQueue({
    QueueName: QUEUE_NAME,
    Attributes: {
        ReceiveMessageWaitTimeSeconds: '20'
    }
}).then((data) => {
    return receiveMessage(data.QueueUrl);
}).catch((err) => {
    console.error(err);
});
