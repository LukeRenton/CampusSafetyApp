const request = require('supertest');
const express = require('express');
const safetyResourcesRoutes = require('../../../routes/SafetyResourcesRoutes');
const safetyResourcesController = require('../../../controllers/SafetyResourcesController');

// Create a mock Express app for testing
const app = express();
app.use(express.json());
app.use('/resources', safetyResourcesRoutes);

// Mock the database pool
jest.mock('../../../db', () => ({
    query: jest.fn(),
}));

const pool = require('../../../db');

describe('SafetyResourcesController', () => {

    let consoleErrorSpy;

    beforeAll(async () => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    afterEach(() => {
        consoleErrorSpy.mockClear(); // Clear mock to avoid residual effect in other tests
    });

    afterAll(async () => {
        // Restore console.error and clean up database
        consoleErrorSpy.mockRestore();
    });

    describe('GET /resources/safety-resources', () => {
        it('should return all safety resources', async () => {
            // Mock the database response
            const mockResources = [{ id: 1, type: 'fire', name: 'Fire Extinguisher' }];
            pool.query.mockResolvedValueOnce([mockResources]);

            const res = await request(app).get('/resources/safety-resources');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockResources);
        });

        it('should return 500 if there is a server error', async () => {
            // Mock the database to throw an error
            pool.query.mockRejectedValueOnce(new Error('Database error'));

            const res = await request(app).get('/resources/safety-resources');

            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ message: 'Server error: Database error' });
        });
    });

    describe('GET /resources/safety-resources/:type', () => {
        it('should return safety resources of a specific type', async () => {
            // Mock the database response for a specific type
            const mockResources = [{ id: 1, type: 'fire', name: 'Fire Extinguisher' }];
            pool.query.mockResolvedValueOnce([mockResources]);

            const res = await request(app).get('/resources/safety-resources/fire');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockResources);
        });

        it('should return 500 if there is a server error', async () => {
            // Mock the database to throw an error
            pool.query.mockRejectedValueOnce(new Error('Database error'));

            const res = await request(app).get('/resources/safety-resources/fire');

            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ message: 'Server error: Server error: Database error' });
        });
    });
});