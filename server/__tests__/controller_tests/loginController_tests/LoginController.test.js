const request = require('supertest');
const express = require('express');
const loginController = require('../../../controllers/LoginController');
const loginRoutes = require('../../../routes/LoginRoutes');

// Create a mock Express app for testing
const app = express();
app.use(express.json());
app.use('/users', loginRoutes);

// Mock the loginController's validateUserLogin function
jest.mock('../../../controllers/LoginController', () => ({
    validateUserLogin: jest.fn(),
}));

describe('POST /users/login', () => {

    it('should return 200 and a success message when credentials are valid', async () => {
        // Mock validateUserLogin to return true for valid credentials
        loginController.validateUserLogin.mockResolvedValueOnce(true);

        const res = await request(app)
            .post('/users/login')
            .send({ username: 'validUser', password: 'validPass' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Login successful' });
    });

    it('should return 401 and an error message when credentials are invalid', async () => {
        // Mock validateUserLogin to return false for invalid credentials
        loginController.validateUserLogin.mockResolvedValueOnce(false);

        const res = await request(app)
            .post('/users/login')
            .send({ username: 'invalidUser', password: 'invalidPass' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ message: 'Invalid credentials' });
    });

    it('should return 500 and a server error message when an error occurs', async () => {
        // Mock validateUserLogin to throw an error
        loginController.validateUserLogin.mockRejectedValueOnce(new Error('Database error'));

        const res = await request(app)
            .post('/users/login')
            .send({ username: 'user', password: 'pass' });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: 'Server error: Database error' });
    });
});
