const { getUsernameQuery } = require('../mapping/users-query');
const { getUser } = require('../data/account-db');

validate = async (username, result) => {
    if (username) {
        result = validateUsername(username, result);
        result = await validateDuplicate(username, result);
    } else {
        result.isValid = false;
        result.messages.push('A username is required for account creation.');
    }

    return result;
}

const validateUsername = (username, result) => {
    if (!username.match(/^[0-9a-zA-Z]+$/)) {
        result.isValid = false;
        result.messages.push('Username must be an alpha numeric string.');
    }

    if (username.length < 5 || username.length > 25) {
        result.isValid = false;
        result.messages.push('Username must be between 5 and 25 characters in length.');
    }

    return result;
};

const validateDuplicate = async (username, result) => {
    const user = await getUser(getUsernameQuery(username));

    if (!user) {
        result.isValid = false;
        result.messages.push('Provided username is currently in use. Please try another username.');
    }

    return result;
};

module.exports = { validate };