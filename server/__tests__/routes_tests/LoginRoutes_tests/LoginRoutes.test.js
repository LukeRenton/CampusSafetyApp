const request = require('supertest');
const express = require('express');
const loginRouter = require('../../../routes/LoginRoutes');
const loginController = require('../../../controllers/LoginController');

jest.mock('../../../controllers/LoginController');

describe('POST /login', () => {
    const app = express();
    app.use(express.json());
    app.use(loginRouter);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond with 200 and a success message for valid credentials', async () => {
        const username = 'testuser';
        const password = 'password123';

        loginController.validateUserLogin.mockResolvedValue(true);

        const response = await request(app)
            .post('/login')
            .send({ username, password });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Login successful' });
    });

    it('should respond with 401 and an invalid credentials message for invalid credentials', async () => {
        const username = 'testuser';
        const password = 'wrongpassword';

        loginController.validateUserLogin.mockResolvedValue(false);

        const response = await request(app)
            .post('/login')
            .send({ username, password });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Invalid credentials' });
    });

    it('should respond with 500 for server error', async () => {
        const username = 'testuser';
        const password = 'password123';

        loginController.validateUserLogin.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/login')
            .send({ username, password });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Server error: Database error' });
    });
});
