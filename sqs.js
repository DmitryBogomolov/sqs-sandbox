const AWS = require('aws-sdk');
const config = require('./config');
AWS.config = new AWS.Config(config);

function wrap(func) {
    return (...args) => new Promise((resolve, reject) => {
        const callback = (err, result) => (err ? reject(err) : resolve(result));
        func(...args.concat(callback));
    });
}

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const wrapper = {};
[
    'listQueues', 'createQueue', 'deleteQueue',
    'sendMessage', 'receiveMessage', 'deleteMessage'
].forEach(name => (wrapper[name] = wrap(sqs[name].bind(sqs))));

module.exports = wrapper;
