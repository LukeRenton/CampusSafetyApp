const { getAllIncidents, UpdateSafetyIncidents, ReportSafetyIncidents } = require('../../../controllers/IncidentController');
const pool = require('../../../db');

// Mock the pool.query method
jest.mock('../../../db');

describe('IncidentController', () => {
    let consoleErrorSpy;

    beforeAll(() => {
        // Suppress console.error globally in all tests
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        // Restore console.error after all tests
        consoleErrorSpy.mockRestore();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('getAllIncidents should retrieve all incidents', async () => {
        // Arrange
        const mockIncidents = [
            { id: 1, building_name: 'Building A', description: 'Fire', status: 'Resolved', timestamp: '2024-09-13T00:00:00Z' },
            { id: 2, building_name: 'Building B', description: 'Flood', status: 'Pending', timestamp: '2024-09-13T00:00:00Z' },
        ];
        pool.query.mockResolvedValue([mockIncidents]);

        // Act
        const result = await getAllIncidents();

        // Assert
        expect(result).toEqual(mockIncidents);
        expect(pool.query).toHaveBeenCalledWith('SELECT id, building_name, description,status, timestamp FROM incidents ');
    });

    test('getAllIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(getAllIncidents()).rejects.toThrow(`Server error : ${errorMessage}`);
    });

    test('UpdateSafetyIncidents should update and retrieve incident status', async () => {
        // Arrange
        const id = 1;
        const newStatus = 'Resolved';
        const mockUpdatedIncident = [{ id, status: newStatus }];
        pool.query.mockResolvedValueOnce(undefined); // For the update query
        pool.query.mockResolvedValueOnce([mockUpdatedIncident]); // For the select query

        // Act
        const result = await UpdateSafetyIncidents(id, newStatus);

        // Assert
        expect(result).toEqual(mockUpdatedIncident);
        expect(pool.query).toHaveBeenCalledWith('UPDATE incidents SET status = ? WHERE id = ?', [newStatus, id]);
        expect(pool.query).toHaveBeenCalledWith('SELECT id, status WHERE id = ?', [id]);
    });

    test('UpdateSafetyIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(UpdateSafetyIncidents(1, 'Resolved')).rejects.toThrow(`Server error : ${errorMessage}`);
    });

    test('ReportSafetyIncidents should insert new incident', async () => {
        // Arrange
        const mockResponse = "Data Inserted";
        pool.query.mockResolvedValue(undefined); // For the insert query

        // Act
        const result = await ReportSafetyIncidents('Fire', 'photo.jpg', 40.7128, -74.0060, 'Building A');

        // Assert
        expect(result).toBe(mockResponse);
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO incidents(description, photo, latitude, longitude, building_name, timestamp) VALUES(?, ?, ?, ?, ?, NOW())',
            ['Fire', 'photo.jpg', 40.7128, -74.0060, 'Building A']
        );
    });

    test('ReportSafetyIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(ReportSafetyIncidents('Fire', 'photo.jpg', 40.7128, -74.0060, 'Building A')).rejects.toThrow(`Server error : ${errorMessage}`);
    });
});
