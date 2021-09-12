const validator = require('../../src/validation/password');

describe('password validator', () => {
    let actual = {};

    beforeEach(() => {
        actual = { 
            isValid: true, 
            messages: []
        };
    });

    afterEach(() => {
        actual = {};
    });

    it('should return that password is valid', () => {
        const expected = {
            isValid: true,
            messages: []
        };
        const request = 'On3p@s5W0rD';

        actual = validator.validate(request, actual);

        expect(actual).toStrictEqual(expected);
    });

    it('should return invalid and password is required field', () => {
        const expected = {
            isValid: false,
            messages: [ 'A password is required for account creation.' ]
        };

        actual = validator.validate(undefined, actual);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        ['is too short', 'Ab3!', 'Password must be at least 8 characters in length.'],
        ['has no numeric characters', 'Ab@!eefX', 'Password must contain at least one numeric character.'],
        ['has no lowercase alphabetic characters', 'AB@!1EFX', 'Password must contain at least one lowercase alphabetic character.'],
        ['has no uppercase alphabetic characters', 'ab@!1efx', 'Password must contain at least one uppercase alphabetic character.'],
        ['has no special characters', 'ab121EfX', 'Password must contain at least one special character.']
    ])('should return invalid with appropriate message when password %s', (n, password, message) => {
        const expected = {
            isValid: false,
            messages: [message]
        };

        actual = validator.validate(password, actual);

        expect(actual).toStrictEqual(expected);
    });

    it('should return multiple messages when there are multiple errors', () => {
        const expected = {
            isValid: false,
            messages: [
                'Password must be at least 8 characters in length.',
                'Password must contain at least one numeric character.',
                'Password must contain at least one uppercase alphabetic character.',
                'Password must contain at least one special character.'
            ]
        };

        actual = validator.validate('abcd', actual);

        expect(actual).toStrictEqual(expected);
    })
});