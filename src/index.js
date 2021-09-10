const { saveUser } = require('./data/account-db');

exports.handler = async (event) => {
    let response = {};
    try {
        await saveUser(JSON.parse(event.body));
        response = createResponse(201, { message: 'User successfully created!' });
    } catch (err) {
        console.error(`An error occurred. ${err.message} --- ${err.stack}`);
        response = createResponse(500, { message: 'Some error occurred while processing your request.' });
    } finally {
        return response;
    }
};

const createResponse = (statusCode, payload) => {
    return {
        statusCode: statusCode,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
    }
};