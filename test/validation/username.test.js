const validator = require('../../src/validation/username');

describe('username validator', () => {
    let actual;

    beforeEach(() => {
        actual = {
            isValid: true,
            messages: []
        };
    });

    it.each([
        'gwape',
        'QIqluPTXsAfVyeygoaBXQHZze',
        'gwapesusername'
    ])('should return that username is valid', (username) => {
        const expected = {
            isValid: true,
            messages: []
        };

        actual = validator.validate(username, actual);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        ['when no username is provided', null, 'A username is required for account creation.'],
        ['when username is not alpha numeric', 'gw@p3s', 'Username must be an alpha numeric string.'],
        ['when username is too short', 'gwap', 'Username must be between 5 and 25 characters in length.'],
        ['when username is too short', 'kKsApgEtLlfIyStcynJlqUZQey', 'Username must be between 5 and 25 characters in length.'],
    ])('should return invalid when %s', (n, username, expectedMessage) => {
        const expected = {
            isValid: false,
            messages: [expectedMessage]
        };

        actual = validator.validate(username, actual);

        expect(actual).toStrictEqual(expected);
    });
});