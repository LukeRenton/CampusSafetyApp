const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const IncidentRoutes = require('../../../routes/IncidentsRoutes');
const IncidentController = require('../../../controllers/IncidentController');

// Setup the Express app with the routes
app.use(bodyParser.json());
app.use('/incidents', IncidentRoutes);

jest.mock('../../../db'); // Adjust path to your database module
const pool = require('../../../db');
// Mock the IncidentController methods
jest.mock('../../../controllers/IncidentController');

describe('Incident Routes Integration Tests', () => {
  let consoleErrorSpy;

  beforeAll(async () => {
    // Suppress console.error during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await pool.query('CREATE TABLE IF NOT EXISTS incidents (id SERIAL PRIMARY KEY, description TEXT, photo TEXT, latitude FLOAT, longitude FLOAT, building_name TEXT, timestamp TIMESTAMP)');
  });

  beforeEach(async () => {
    // Clear data before each test
    await pool.query('DELETE FROM incidents');
  });

  afterAll(async () => {
    // Restore console.error and clean up database
    consoleErrorSpy.mockRestore();
    await pool.query('DROP TABLE incidents');
    await pool.end();
  });

  test('GET /incidents/all-incidents should return all incidents', async () => {
    // Arrange
    const mockIncidents = [
      { id: 1, building_name: 'Building A', description: 'Fire', status: 'Resolved', timestamp: '2024-09-13T00:00:00Z' },
      { id: 2, building_name: 'Building B', description: 'Flood', status: 'Pending', timestamp: '2024-09-13T00:00:00Z' }
    ];
    IncidentController.getAllIncidents.mockResolvedValue(mockIncidents);

    // Act
    const response = await request(app).get('/incidents/all-incidents');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockIncidents);
  });

  test('PATCH /incidents/:id/status should update the status of an incident', async () => {
    // Arrange
    const id = 1;
    const status = { status: 'Resolved' };
    IncidentController.UpdateSafetyIncidents.mockResolvedValue({ id, ...status });

    // Act
    const response = await request(app).patch(`/incidents/${id}/status`).send(status);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id, ...status });
  });

  test('POST /incidents/report-incidents should upload photo and create a new incident', async () => {
    // Arrange
    const mockPhotoUrl = 'https://campussafety.com/photo.jpg';
    const mockIncident = {
      description: 'Test incident',
      latitude: 123.45,
      longitude: 67.89,
      building_name: 'Test Building'
    };
    IncidentController.ReportSafetyIncidents.mockResolvedValue('Data Inserted');

    // Mock Firebase upload functions
    jest.mock('firebase/storage', () => ({
      ref: jest.fn(() => ({ ref: 'mockRef' })),
      getDownloadURL: jest.fn(() => Promise.resolve(mockPhotoUrl)),
      uploadBytesResumable: jest.fn(() => Promise.resolve({ ref: 'mockRef' }))
    }));

    // Act
    const response = await request(app)
      .post('/incidents/report-incidents')
      .attach('photo', Buffer.from('test image data'), 'test-image.jpg') // Simulates file upload
      .field('description', mockIncident.description)
      .field('latitude', mockIncident.latitude)
      .field('longitude', mockIncident.longitude)
      .field('building_name', mockIncident.building_name);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toBe('Data Inserted');
  });
});
