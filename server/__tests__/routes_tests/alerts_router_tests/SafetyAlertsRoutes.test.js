const request = require('supertest');
const express = require('express');
const app = express();
const safetyAlertsRouter = require('../../../routes/SafetyAlertsRoutes');
app.use(express.json());
app.use('/alerts', safetyAlertsRouter);

// Mock the controller functions
const { insertAlert, fetchAlerts, updateAlertStatus } = require('../../../controllers/SafetyAlertsController');
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
        // Restore console.error and clean up database
        consoleErrorSpy.mockRestore();
    });

    // Test GET /alerts/alerts
    test('GET /alerts/alerts - should fetch all alerts', async () => {
        const mockAlerts = [
            { id: 1, type: 'Fire', status: 'active', affected_area: 'Building A', date: '2024-09-16T10:00:00Z' },
            { id: 2, type: 'Flood', status: 'resolved', affected_area: 'Building B', date: '2024-09-16T11:00:00Z' },
        ];
        fetchAlerts.mockResolvedValue(mockAlerts);

        const response = await request(app).get('/alerts/alerts');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAlerts);
        expect(fetchAlerts).toHaveBeenCalledTimes(1);
    });

    // Test POST /alerts/alerts
    test('POST /alerts/alerts - should create a new alert', async () => {
        const newAlert = {
            type: 'Earthquake',
            status: 'active',
            affected_area: 'Building C',
            date: '2024-09-16T12:00:00Z'
        };
        
        insertAlert.mockResolvedValue(); // Simulate successful insertion

        const response = await request(app).post('/alerts/alerts').send(newAlert);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ type: 'Alert created successfully' });
        expect(insertAlert).toHaveBeenCalledWith(newAlert.type, newAlert.status, newAlert.affected_area, newAlert.date);
    });

    // Test PATCH /alerts/:alertId/status
    test('PATCH /alerts/:alertId/status - should update alert status', async () => {
        const alertId = 1;
        const updatedStatus = 'resolved';

        updateAlertStatus.mockResolvedValue(); // Simulate successful update

        const response = await request(app).patch(`/alerts/alerts/${alertId}/status`).send({ status: updatedStatus });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ type: 'Alert status updated successfully' });
        expect(updateAlertStatus).toHaveBeenCalledWith(alertId, updatedStatus);
    });
});
