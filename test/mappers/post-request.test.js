const mapper = require('../../src/mapping/post-request');
const hasher = require('../../src/encryption/password-hash');

jest.mock('../../src/encryption/password-hash');

describe('post user request mapper', () => {
    beforeEach(() => {
        process.env.USER_ACCOUNTS_TABLE = 'table-name';
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        delete process.env.USER_ACCOUNTS_TABLE;
    });

    it('should return correct mapped response', () => {
        mockHash({ hash: 'hashedvalue', salt: 'saltforhash' });
        const expected = {
            Item: {
                email: { S: 'person@email.com' },
                username: { S: 'gwapes' },
                password: { S: 'hashedvalue' },
                salt: { S: 'saltforhash' }
            },
            TableName: 'table-name'
        };
        const request = {
            email: 'person@email.com',
            password: 'password',
            username: 'gwapes'
        };

        const actual = mapper.map(request);

        expect(actual.Item.email).toStrictEqual(expected.Item.email);
        expect(actual.Item.username).toStrictEqual(expected.Item.username);
        expect(actual.Item.password).toStrictEqual(expected.Item.password);
        expect(actual.Item.salt).toStrictEqual(expected.Item.salt);
        expect(actual.Item.created_at.S).toBeTruthy();
        expect(actual.Item.updated_at.S).toBeTruthy();
    });
});

const mockHash = (mockResult) => {
    jest.spyOn(hasher, 'hash').mockReturnValue(mockResult);
};