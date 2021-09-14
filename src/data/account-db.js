'use-strict';
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB({apVersion: '2012-08-10'});
const { map } = require('../mapping/post-request');

const saveUser = async (request) => {
    const params = map(request);
    await client.putItem(params).promise();
};

const getUser = async (query) => {
    const result = await client.executeStatement({ Statement: query }).promise();

    return result ?? result.Items;
};

module.exports = { saveUser, getUser };