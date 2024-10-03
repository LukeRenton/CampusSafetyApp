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

    // test('GET /pushalerts should handle server-sent events', async () => {
    //     // Act
    //     const response = await request(app).get('/incidents/pushalerts');
    
    //     // Assert
    //     expect(response.status).toBe(200);
    // }, 25000);
    
});
