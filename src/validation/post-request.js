const email = require('./email');
const password = require('./password');
const username = require('./username');

const validate = async (request) => {
    let result = { 
        isValid: true, 
        messages: []
    };

    result = await email.validate(request.email, result);
    result = await password.validate(request.password, result);
    result = username.validate(request.username, result);

    return result;
}

module.exports = { validate };