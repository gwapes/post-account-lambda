const mapper = require('../../src/mappers/post-request');
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

        expect(actual).toStrictEqual(expected);
    });
});

const mockHash = (mockResult) => {
    jest.spyOn(hasher, 'hash').mockReturnValue(mockResult);
};