const { saveUser } = require('./data/account-db');
const { validate } = require('./validation/post-request');

exports.handler = async (event) => {
    let response = {};
    try {
        const requestBody = JSON.parse(event.body);
        const validationResult = await validate(requestBody);
        if (validationResult.isValid) {
            await saveUser(requestBody);
            response = createResponse(201, { message: 'User successfully created!' });
        } else {
            response = createResponse(400, { errors: validationResult.messages })
        }
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