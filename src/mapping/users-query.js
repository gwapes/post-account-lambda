const getEmailQuery = (email) => {
    return createQuery({
        email: {
            S: email
        }
    });
};

const getUsernameQuery = (username) => {
    return createQuery({
        username: {
            S: username
        }
    });
};

const createQuery = (key) => {
    return {
        Key: key,
        TableName: process.env.USER_ACCOUNTS_TABLE
    };
};

module.exports = { getEmailQuery, getUsernameQuery };