const mapper = require('../../src/mapping/users-query');

describe('user query builder', () => {
    describe('create email query', () => {
        beforeEach(() => { process.env.USER_ACCOUNTS_TABLE = 'fakedb'; });
        afterEach(() => { delete process.env.USER_ACCOUNTS_TABLE; });

        it('should return valid email query', () => {
            const expected = {
                Key: {
                    email: "gwapes@email.com"
                },
                TableName: 'fakedb'
            };

            const actual = mapper.getEmailQuery('gwapes@email.com');

            expect(actual).toStrictEqual(expected);
        });
    });

    describe('create username query', () => {
        beforeEach(() => { process.env.USER_ACCOUNTS_TABLE = 'fakedb'; });
        afterEach(() => { delete process.env.USER_ACCOUNTS_TABLE; });

        it('should return valid username query', () => {
            const expected = {
                Key: {
                    username: "gwapes"
                },
                TableName: 'fakedb'
            };

            const actual = mapper.getUsernameQuery('gwapes');

            expect(actual).toStrictEqual(expected);
        });
    });
});