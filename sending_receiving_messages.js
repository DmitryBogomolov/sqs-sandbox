const sqs = require('./sqs');

const QUEUE_NAME = 'test_queue_1';

sqs.createQueue({
    QueueName: QUEUE_NAME
}).then((data) => {
    const queueUrl = data.QueueUrl;

    return sqs.sendMessage({
        DelaySeconds: 10,
        MessageAttributes: {
            "Title": {
                DataType: 'String',
                StringValue: 'The Whistler'
            },
            "Author": {
                DataType: 'String',
                StringValue: 'John Grisham'
            },
            "WeeksOn": {
                DataType: 'Number',
                StringValue: '6'
            }
        },
        MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
        QueueUrl: queueUrl
    }).then((data) => {
        console.info('send', data);
        return sqs.receiveMessage({
            AttributeNames: [
                'SentTimestamp'
            ],
            // MaxNumberOfMessages: 1,
            MessageAttributeNames: [
                'All'
            ],
            VisibilityTimeout: 0,
            QueueUrl: queueUrl
        });
    }).then((data) => {
        console.info('receive', data);
        return sqs.deleteMessage({
            ReceiptHandle: data.Messages[0].ReceiptHandle,
            QueueUrl: queueUrl
        });
    }).then((data) => {
        console.info('delete', data);
    });
}).catch((err) => {
    console.error(err);
});
