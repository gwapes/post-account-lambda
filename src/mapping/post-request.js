const { hash } = require('../encryption/password-hash');
const { v4: uuidv4 } = require('uuid');

const map = (request) => {
    const result = hash(request.password);

    return {
        Item: {
            id: { S: uuidv4() },
            email: { S: request.email },
            username: { S: request.username },
            password: { S: result.hash },
            salt: { S: result.salt },
            created_at: { S: new Date().toISOString() },
            updated_at: { S: new Date().toISOString() }
        },
        TableName: process.env.USER_ACCOUNTS_TABLE
    };
};

module.exports = { map };