const getEmailQuery = (email) => {
    return `SELECT * FROM "${process.env.USER_ACCOUNTS_TABLE}" WHERE "email" = '${email}'`;
};

const getUsernameQuery = (username) => {
    return `SELECT * FROM "${process.env.USER_ACCOUNTS_TABLE}" WHERE "username" = '${username}'`;
};

module.exports = { getEmailQuery, getUsernameQuery };