'use-strict';
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB({apVersion: '2012-08-10'});
const { map } = require('../mappers/post-request');

const saveUser = async (request) => {
    const params = map(request);
    await client.putItem(params).promise();
};

module.exports = { saveUser };