const validator = require('../../src/validation/email');
const db = require('../../src/data/account-db');

jest.mock('../../src/data/account-db');

describe('email validator', () => {
    let actual = {};

    beforeEach(() => {
        actual = {
            isValid: true,
            messages: []
        };
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('should return email is valid', async () => {
        const expected = {
            isValid: true,
            messages: []
        };
        mockDB(false);

        actual = await validator.validate('gwapes@domain.org', actual);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        ['domain', 'personal@'],
        ['domain', 'personal'],
        ['personal', '@domain.org']
    ])('should return invalid when %s is missing', async (n, email) => {
        const expected = {
            isValid: false,
            messages: ['Email address must be of correct email address format (e.g. myname@domain.com).']
        };
        mockDB(false);

        actual = await validator.validate(email, actual);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        ['name portion is too big',
            'kybhVzivggERdGxyOuRFoZgqZYKVkJtcxEjBtykGPtsRESHCgQXPxTzYWCFxkgbwG@domain.org',
            'First portion of email address cannot be greater than 64 characters in length.'],
        ['name portion contains invalid characters',
            '>?<][)(@invalid.com',
            'First portion of email address contains invalid characters.'],
        ['domain portion is too big',
            'gwapes@EmPCrfSRKydlYohpmSaBWkxFLChFNpUFfMgGxKQpDNEThvhPfouxLhsoIYGDOKpAUSbAPomhfXLDzxQnFqwLzrmKUGjnraIUfGZjOvMzXSiisfNffHQMeMHhmdliLmwbcmbyNsByLQvAXbXqMJyPQpSgAPinmtbeaxBrWfsDoqyiTVAddkPJsbKpPBVqpPjBmdEGWMxODKLYoYhQwATscXxUgcntDBVFPaWNjEEoPeTvwzTCwAAdzWYPFUzOZs.com',
            'Domain portion of email address cannot be greater than 253 characters in length.'],
        ['domain portion contains invalid characters',
            'gwapes@&^Az9!.c0m',
            'Domain portion of email address contains invalid characters.']
    ])('should return invalid when %s', async (n, email, expectedMessage) => {
        const expected = {
            isValid: false,
            messages: [expectedMessage]
        };
        mockDB(false);

        actual = await validator.validate(email, actual);

        expect(actual).toStrictEqual(expected);
    });

    it('should return invalid when there is duplicate email', async () => {
        const expected = {
            isValid: false,
            messages: ['Provided email address already exists. Please use another.']
        };
        mockDB(true);

        actual = await validator.validate('gwapes@email.com', actual);

        expect(actual).toStrictEqual(expected);
    });
});

const mockDB = (hasValue) => {
    const response = hasValue ? { "contents": "stuff" } : null;
    jest.spyOn(db, 'getUser').mockResolvedValue(response);
};