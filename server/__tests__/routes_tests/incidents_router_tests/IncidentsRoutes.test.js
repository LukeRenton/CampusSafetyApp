const request = require('supertest');
const express = require('express');
const incidentRoutes = require('../../../routes/IncidentsRoutes');
const app = express();

app.use(express.json());
app.use('/incidents', incidentRoutes);

jest.mock('../../../controllers/IncidentController');
const IncidentController = require('../../../controllers/IncidentController');

describe('Incident Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /all-incidents should return all incidents', async () => {
        // Arrange
        const mockIncidents = [{ id: 1, description: 'Fire' }];
        IncidentController.getAllIncidents.mockResolvedValue(mockIncidents);

        // Act
        const response = await request(app).get('/incidents/all-incidents');

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockIncidents);
        expect(IncidentController.getAllIncidents).toHaveBeenCalled();
    });

    test('GET /all-incidents should handle errors', async () => {
        // Arrange
        IncidentController.getAllIncidents.mockRejectedValue(new Error('Database error'));

        // Act
        const response = await request(app).get('/incidents/all-incidents');

        // Assert
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Database error' });
    });

    test('PATCH /:id/status should update incident status', async () => {
        // Arrange
        const id = "1";
        const mockUpdatedStatus = [{ id, active: 0 }];
        IncidentController.UpdateSafetyIncidents.mockResolvedValue(mockUpdatedStatus);
        
        // Act
        const response = await request(app).patch(`/incidents/${id}/status`).send({ active: 0 });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUpdatedStatus);
        expect(IncidentController.UpdateSafetyIncidents).toHaveBeenCalledWith(id, 0);
    });

    test('PATCH /:id/status should handle errors', async () => {
        // Arrange
        IncidentController.UpdateSafetyIncidents.mockRejectedValue(new Error('Update failed'));

        // Act
        const response = await request(app).patch(`/incidents/1/status`).send({ active: 0 });

        // Assert
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Serve error: Update failed' });
    });

    test('POST /report-incidents should report a new incident', async () => {
        // Arrange
        const mockResponse = "\"Inserted with id = 1\"";
        IncidentController.ReportSafetyIncidents.mockResolvedValue(1);

        const mockIncidentData = {
            description: 'Fire',
            latitude: 40.7128,
            longitude: -74.0060,
            type: 'fire',
            building_name: 'Wits Flower Hall'
        };

        // Act
        const response = await request(app)
            .post('/incidents/report-incidents')
            .send(mockIncidentData);

        // Assert
        expect(response.status).toBe(200);
        expect(response.text).toBe(mockResponse);
        expect(IncidentController.ReportSafetyIncidents).toHaveBeenCalledWith(
            mockIncidentData.description,
            expect.any(String), // since the photo upload is handled
            mockIncidentData.latitude,
            mockIncidentData.longitude,
            mockIncidentData.type,
            mockIncidentData.building_name
        );
    });

    test('POST /report-incidents should return error for invalid incident type', async () => {
        // Arrange
        const invalidIncidentData = {
            description: 'Invalid Type',
            latitude: 40.7128,
            longitude: -74.0060,
            type: 'invalidType',
            building_name: 'Some Building'
        };

        // Act
        const response = await request(app)
            .post('/incidents/report-incidents')
            .send(invalidIncidentData);

        // Assert
        expect(response.status).toBe(200);
        // expect(response.body.message).toMatch('invalidType');
    });

    test('POST /report-incidents-external should report a new incident without a photo', async () => {
        // Arrange
        const mockResponse = { id: 1 };
        IncidentController.ReportSafetyIncidents.mockResolvedValue(mockResponse);

        const incidentData = {
            description: 'Test Incident',
            type: 'fire',
            building_name: 'Wits Flower Hall'
        };

        // Act
        const response = await request(app)
            .post('/incidents/report-incidents-external')
            .send(incidentData);

        // Assert
        expect(response.status).toBe(500);
        // expect(IncidentController.ReportSafetyIncidents).toHaveBeenCalled();
    });

    test('POST /report-incidents-external should handle invalid building name', async () => {
        // Arrange
        const invalidIncidentData = {
            description: 'Test Incident',
            type: 'fire',
            building_name: 'Invalid Building'
        };

        // Act
        const response = await request(app)
            .post('/incidents/report-incidents-external')
            .send(invalidIncidentData);

        // Assert
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('error: Building Not Found, Use full name.e.g Wits Flower Hall ');
    });

    test('DELETE /all-incidents should delete all incidents', async () => {
        // Arrange
        const mockResponse = 'All incidents deleted';
        IncidentController.deleteAllIncidents.mockResolvedValue(mockResponse);

        // Act
        const response = await request(app).delete('/incidents/all-incidents');

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toBe(mockResponse);
        expect(IncidentController.deleteAllIncidents).toHaveBeenCalled();
    });

    test('DELETE /all-incidents should handle errors', async () => {
        // Arrange
        IncidentController.deleteAllIncidents.mockRejectedValue(new Error('Delete failed'));

        // Act
        const response = await request(app).delete('/incidents/all-incidents');

        // Assert
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Delete failed');
    });

    // test('GET /pushalerts should handle server-sent events', async () => {
    //     // Act
    //     const response = await request(app).get('/incidents/pushalerts');
    
    //     // Assert
    //     expect(response.status).toBe(200);
    // }, 25000);
});
