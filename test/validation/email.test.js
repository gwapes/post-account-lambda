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
});