const sqs = require('./sqs');

sqs.listQueues()
    .then(
        (data) => {
            console.log('list', data);
            return sqs.createQueue({
                QueueName: 'queue-1',
                Attributes: {
                    DelaySeconds: '60',
                    MessageRetentionPeriod: '3600'
                }
            });
        },
        (err) => console.error(err)
    )
    .then(
        (data) => {
            console.info('create', data);
            return sqs.listQueues();
        },
        (err) => console.error(err)
    )
    .then(
        (data) => {
            console.info('list', data);
            const url = data.QueueUrls.find(item => item.endsWith('queue-1'));
            return url && sqs.deleteQueue({
                QueueUrl: url
            });
        },
        (err) => console.error(err)
    )
    .then(
        (data) => {
            console.info('delete', data);
            return sqs.listQueues();
        },
        (err) => console.error(err)
    )
    .then(
        (data) => {
            console.info('list', data);
        },
        (err) => console.error(err)
    );
