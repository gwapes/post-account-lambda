const validator = require('../../src/validation/username');
const db = require('../../src/data/account-db');

jest.mock('../../src/data/account-db');

describe('username validator', () => {
    let actual;

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

    it.each([
        'gwape',
        'QIqluPTXsAfVyeygoaBXQHZze',
        'gwapesusername'
    ])('should return that username is valid', async (username) => {
        const expected = {
            isValid: true,
            messages: []
        };
        mockDB(true);

        actual = await validator.validate(username, actual);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        ['when no username is provided', null, 'A username is required for account creation.'],
        ['when username is not alpha numeric', 'gw@p3s', 'Username must be an alpha numeric string.'],
        ['when username is too short', 'gwap', 'Username must be between 5 and 25 characters in length.'],
        ['when username is too short', 'kKsApgEtLlfIyStcynJlqUZQey', 'Username must be between 5 and 25 characters in length.'],
    ])('should return invalid when %s', async (n, username, expectedMessage) => {
        const expected = {
            isValid: false,
            messages: [expectedMessage]
        };
        mockDB(true);

        actual = await validator.validate(username, actual);

        expect(actual).toStrictEqual(expected);
    });

    it('should fail validation when duplicate exists', async () => {
        const expected = {
            isValid: false,
            messages: ['Provided username is currently in use. Please try another username.']
        };
        mockDB(false);

        actual = await validator.validate('gwapes', actual);

        expect(actual).toStrictEqual(expected);
    });
});

const mockDB = (hasValue) => {
    const response = hasValue ? { "contents": "stuff" } : null;
    jest.spyOn(db, 'getUser').mockResolvedValue(response);
};