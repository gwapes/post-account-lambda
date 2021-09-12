const email = require('./email');
const password = require('./password');
const username = require('./username');

const validate = (request) => {
    let result = { 
        isValid: true, 
        messages: []
    };

    result = email.validate(request.email, result);
    result = password.validate(request.password, result);
    result = username.validate(request.username, result);

    return result;
}

module.exports = { validate };