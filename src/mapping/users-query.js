const getEmailQuery = (email) => {
    return createQuery({
        email: email
    });
};

const getUsernameQuery = (username) => {
    return createQuery({
        username: username
    });
};

const createQuery = (key) => {
    return {
        Key: key,
        TableName: process.env.USER_ACCOUNTS_TABLE
    };
};

module.exports = { getEmailQuery, getUsernameQuery };