const db = require('../src/data/account-db');
const validator = require('../src/validation/post-request');
const handler = require('../src/index');

jest.mock('../src/data/account-db');
jest.mock('../src/validation/post-request');

describe('post account lambda handler function', () => {
    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('should return 201 with created message', async () => {
        mockDB(true);
        mockValidator(true, []);
        const expected = {
            statusCode: 201,
            headers: { "content-type": "application/json" },
            body: "{\"message\":\"User successfully created!\"}"
        };

        const actual = await handler.handler({ body: "{\"stuff\": \"value\"}" });

        expect(actual).toStrictEqual(expected);
    });

    it('should return 400 with created message', async () => {
        mockDB(true);
        mockValidator(false, ['The request was invalid.']);
        const expected = {
            statusCode: 400,
            headers: { "content-type": "application/json" },
            body: "{\"errors\":[\"The request was invalid.\"]}"
        };

        const actual = await handler.handler({ body: "{\"stuff\": \"value\"}" });

        expect(actual).toStrictEqual(expected);
    });

    it('should return 500 when an unexpected error occurs', async() => {
        mockDB(false);
        mockValidator(true, []);
        const expected = {
            statusCode: 500,
            headers: { "content-type": "application/json" },
            body: "{\"message\":\"Some error occurred while processing your request.\"}"
        };

        const actual = await handler.handler({ body: "{\"stuff\": \"value\"}" });

        expect(actual).toStrictEqual(expected);
    });
});

const mockDB = (isSuccess) => {
    if (isSuccess) {
        jest.spyOn(db, 'saveUser').mockResolvedValue(true);
    } else {
        jest.spyOn(db, 'saveUser').mockRejectedValue(new Error('There was an error!'));
    }
};

const mockValidator = (isValid, messages) => {
    jest.spyOn(validator, 'validate').mockReturnValue({ isValid, messages });
};