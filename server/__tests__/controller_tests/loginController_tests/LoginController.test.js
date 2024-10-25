
const { validateUserLogin } = require('../../../controllers/LoginController');
const pool = require('../../../db');

jest.mock('../../../db', () => ({
    query: jest.fn(),
}));

describe('LoginController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validateUserLogin', () => {
        it('should return true if the user exists with correct credentials', async () => {
            const mockRows = [{ id: 1, username: 'testuser', password: 'password123' }];
            pool.query.mockResolvedValue([mockRows]);

            const username = 'testuser';
            const password = 'password123';

            const result = await validateUserLogin(username, password);
            expect(result).toBe(true);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM users WHERE username = ? AND password = ?;',
                [username, password]
            );
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should return false if the user does not exist with provided credentials', async () => {
            const mockRows = [];
            pool.query.mockResolvedValue([mockRows]);

            const username = 'invaliduser';
            const password = 'wrongpassword';

            const result = await validateUserLogin(username, password);

            expect(result).toBe(false);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM users WHERE username = ? AND password = ?;',
                [username, password]
            );
            expect(pool.query).toHaveBeenCalledTimes(1);
        });        
    });
});
