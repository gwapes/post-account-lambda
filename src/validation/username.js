validate = (username, result) => {
    if (username) {
        //username validation
        //duplicate username check
    } else {
        result.isValid = false;
        result.messages.push('A username is required for account creation.');
    }

    return result;
}

module.exports = { validate };