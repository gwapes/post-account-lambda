const mapper = require('../../src/mapping/users-query');

describe('user query builder', () => {
    describe('create email query', () => {
        beforeEach(() => { process.env.USER_ACCOUNTS_TABLE = 'fakedb'; });
        afterEach(() => { delete process.env.USER_ACCOUNTS_TABLE; });

        it('should return valid email query', () => {
            const expected = 'SELECT * FROM "fakedb" WHERE "email" = \'gwapes@email.com\'';

            const actual = mapper.getEmailQuery('gwapes@email.com');

            expect(actual).toEqual(expected);
        });
    });

    describe('create username query', () => {
        beforeEach(() => { process.env.USER_ACCOUNTS_TABLE = 'fakedb'; });
        afterEach(() => { delete process.env.USER_ACCOUNTS_TABLE; });

        it('should return valid username query', () => {
            const expected = 'SELECT * FROM "fakedb" WHERE "username" = \'gwapes\'';

            const actual = mapper.getUsernameQuery('gwapes');

            expect(actual).toEqual(expected);
        });
    });
});