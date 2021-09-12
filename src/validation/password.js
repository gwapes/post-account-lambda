const validate = (password, result) => {
    if (password) {
        result = validatePasswordIsSecure(password, result);
    } else {
        result.isValid = false;
        result.messages.push('A password is required for account creation.');
    }

    return result;
}

const validatePasswordIsSecure = (password, result) => {
    if (password.length < 8) {
        result.isValid = false;
        result.messages.push('Password must be at least 8 characters in length.')
    }

    if (!password.match(/(?=.*\d)/)) {
        result.isValid = false;
        result.messages.push('Password must contain at least one numeric character.');
    }

    if (!password.match(/(?=.*[a-z])/)) {
        result.isValid = false;
        result.messages.push('Password must contain at least one lowercase alphabetic character.');
    }

    if (!password.match(/(?=.*[A-Z])/)) {
        result.isValid = false;
        result.messages.push('Password must contain at least one uppercase alphabetic character.');
    }

    if (!password.match(/(?=.*\W)/)) {
        result.isValid = false;
        result.messages.push('Password must contain at least one special character.');
    }

    return result;
}

module.exports = { validate };