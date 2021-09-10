const crypto = require('crypto');

const hash = (password, existingSalt) => {
    let salt = existingSalt ? existingSalt : getSalt();

    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let result = hash.digest('hex');

    return {
        salt: salt,
        hash: result
    };
};

const getSalt = () => {
    return crypto.randomBytes(8).toString('hex').slice(0, 16);
};

module.exports = { hash };