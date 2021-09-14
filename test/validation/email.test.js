const validator = require('../../src/validation/email');

describe('email validator', () => {
    let actual = {};

    beforeEach(() => {
        actual = {
            isValid: true,
            messages: []
        };
    });

    it('should return email is valid', () => {
        const expected = {
            isValid: true,
            messages: []
        };

        actual = validator.validate('gwapes@domain.org', actual);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        ['domain', 'personal@'],
        ['domain', 'personal'],
        ['personal', '@domain.org']
    ])('should return invalid when %s is missing', (n, email) => {
        const expected = {
            isValid: false,
            messages: ['Email address must be of correct email address format (e.g. myname@domain.com).']
        };

        actual = validator.validate(email, actual);

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
    ])('should return invalid when %s', (n, email, expectedMessage) => {
        const expected = {
            isValid: false,
            messages: [expectedMessage]
        };

        actual = validator.validate(email, actual);

        expect(actual).toStrictEqual(expected);
    });
});