'use-strict';
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB({apVersion: '2012-08-10'});

const saveUser = async (user) => {
    const params = {
        Item: {
            email: { S: user.email },
            username: { S: user.username },
            password: { S: user.password }
        },
        TableName: 'user-accounts'
    };

    await client.putItem(params).promise();
};

module.exports = { saveUser };