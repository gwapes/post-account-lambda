const { getEmailQuery } = require('../mapping/users-query');
const { getUser } = require('../data/account-db');

validate = async (email, result) => {
    if (email) {
        result = await validateEmail(email, result);
    } else {
        result.isValid = false;
        result.messages.push('An email address is required for account creation.');
    }

    return result;
}

const validateEmail = async (email, result) => {
    const [personal, domain] = email.split('@');

    if (!personal || !domain) {
        result.isValid = false;
        result.messages.push('Email address must be of correct email address format (e.g. myname@domain.com).');
    } else {
        result = validatePersonal(personal, result);
        result = validateDomain(domain, result);
        result = await validateDuplicate(email, result);
    }

    return result;
};

const validatePersonal = (personal, result) => {
    if (personal.length > 64) {
        result.isValid = false;
        result.messages.push('First portion of email address cannot be greater than 64 characters in length.');
    }

    if (!personal.match(/^[^.][0-9a-zA-Z!#$%&'*+\-/=?^_`{|}~.]+[^.]$/)) {
        result.isValid = false;
        result.messages.push('First portion of email address contains invalid characters.');
    }

    return result;
};

const validateDomain = (domain, result) => {
    if (domain.length > 253) {
        result.isValid = false;
        result.messages.push('Domain portion of email address cannot be greater than 253 characters in length.');
    }

    if (!domain.match(/^[0-9a-zA-Z\-.]+$/)) {
        result.isValid = false;
        result.messages.push('Domain portion of email address contains invalid characters.');
    }

    return result;
};

const validateDuplicate = async (email, result) => {
    const user = await getUser(getEmailQuery(email));

    if (!user) {
        result.isValid = false;
        result.messages.push('Provided email address already exists. Please use another.');
    }

    return result;
};

module.exports = { validate };