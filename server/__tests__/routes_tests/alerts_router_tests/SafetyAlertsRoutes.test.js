const request = require('supertest');
const express = require('express');
const app = express();
const safetyAlertsRouter = require('../../../routes/SafetyAlertsRoutes');
app.use(express.json());
app.use('/alerts', safetyAlertsRouter);

// Mock the controller functions
const { insertAlert, fetchAlerts, updateAlertStatus, deleteAlerts } = require('../../../controllers/SafetyAlertsController');
jest.mock('../../../controllers/SafetyAlertsController');

describe('Safety Alerts API Integration Tests', () => {
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
        // Restore console.error
        consoleErrorSpy.mockRestore();
    });

    // Test GET /alerts
    test('GET /alerts - should fetch all alerts', async () => {
        const mockAlerts = [
            { id: 1, type: 'Fire', active: true, longitude: 28.1234, latitude: -26.1234, date: '2024-09-16T10:00:00Z' },
            { id: 2, type: 'Flood', active: false, longitude: 28.2345, latitude: -26.2345, date: '2024-09-16T11:00:00Z' },
        ];
        fetchAlerts.mockResolvedValue(mockAlerts);

        const response = await request(app).get('/alerts/alerts');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAlerts);
        expect(fetchAlerts).toHaveBeenCalledTimes(1);
    });

    // Test POST /alerts
    test('POST /alerts - should create a new alert', async () => {
        const newAlert = {
            type: 'Earthquake',
            active: true, // Changed from 'status' to 'active'
            longitude: 28.3456,
            latitude: -26.3456,
            date: '2024-09-16T12:00:00Z' // Kept the date field
        };
        
        insertAlert.mockResolvedValue(3); // Simulate successful insertion with inserted ID 3

        const response = await request(app).post('/alerts/alerts').send(newAlert);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Alert created successfully' });
        expect(insertAlert).toHaveBeenCalledWith(newAlert.type, newAlert.active, newAlert.longitude, newAlert.latitude, newAlert.date);
    });

    // Test PATCH /alerts/:alertId/active
    test('PATCH /alerts/:alertId/active - should update alert active status', async () => {
        const alertId = 1;
        const updatedActiveStatus = false;

        updateAlertStatus.mockResolvedValue(); // Simulate successful update

        const response = await request(app).patch(`/alerts/alerts/${alertId}/active`).send({ active: updatedActiveStatus });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Alert active status updated successfully' });
        expect(updateAlertStatus).toHaveBeenCalledWith(alertId, updatedActiveStatus);
    });

    // Test DELETE /alerts
    test('DELETE /alerts - should delete all alerts', async () => {
        deleteAlerts.mockResolvedValue({ message: 'All alerts deleted successfully' });

        const response = await request(app).delete('/alerts/alerts');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'All alerts deleted successfully' });
        expect(deleteAlerts).toHaveBeenCalledTimes(1);
    });
});
