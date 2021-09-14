const { hash } = require('../encryption/password-hash');

const map = (request) => {
    const result = hash(request.password);

    return {
        Item: {
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