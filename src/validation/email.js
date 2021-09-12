validate = (email, result) => {
    if (email) {
        result = validateEmail(email, result);
    } else {
        result.isValid = false;
        result.messages.push('An email address is required for account creation.');
    }

    return result;
}

const validateEmail = (email, result) => {
    const [personal, domain] = email.split('@');

    if (!personal || !domain) {
        result.isValid = false;
        result.messages.push('Email address must be of correct email address format (e.g. myname@domain.com).');
    } else {
        result = validatePersonal(personal, result);
        result = validateDomain(domain, result);

        //TODO duplicate email check
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

module.exports = { validate };