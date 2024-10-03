const { getAllIncidents, UpdateSafetyIncidents, ReportSafetyIncidents, deleteAllIncidents } = require('../../../controllers/IncidentController');
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

    test('getAllIncidents should retrieve and format all incidents', async () => {
        // Arrange
        const mockIncidents = [
            { id: 1, building_name: 'Building A', description: 'Fire', date: '2024-09-13T00:00:00Z', active: true },
            { id: 2, building_name: 'Building B', description: 'Flood', date: '2024-09-14T00:00:00Z', active: false },
        ];
        pool.query.mockResolvedValue([mockIncidents]);

        // Act
        const result = await getAllIncidents();

        // Assert
        expect(result).toEqual([
            { id: 1, building_name: 'Building A', description: 'Fire', date: { day: 13, month: 9, year: 2024, time: { hour: 0, minute: 0 } }, active: true },
            { id: 2, building_name: 'Building B', description: 'Flood', date: { day: 14, month: 9, year: 2024, time: { hour: 0, minute: 0 } }, active: false }
        ]);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM incidents');
    });

    test('getAllIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(getAllIncidents()).rejects.toThrow(`Server error : ${errorMessage}`);
    });

    test('UpdateSafetyIncidents should update and retrieve incident active status', async () => {
        // Arrange
        const id = 1;
        const active = true;
        const mockUpdatedIncident = [{ id, active }];
        pool.query.mockResolvedValueOnce(undefined); // For the update query
        pool.query.mockResolvedValueOnce([mockUpdatedIncident]); // For the select query

        // Act
        const result = await UpdateSafetyIncidents(id, active);

        // Assert
        expect(result).toEqual(mockUpdatedIncident);
        expect(pool.query).toHaveBeenCalledWith('UPDATE incidents SET active = ? WHERE id = ?', [active, id]);
        expect(pool.query).toHaveBeenCalledWith('SELECT id, active FROM incidents WHERE id = ?', [id]);
    });

    test('UpdateSafetyIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(UpdateSafetyIncidents(1, true)).rejects.toThrow(`Server error : ${errorMessage}`);
    });

    test('ReportSafetyIncidents should insert new incident and return the inserted id', async () => {
        // Arrange
        const mockResponse = { insertId: 1 };
        pool.query.mockResolvedValue([mockResponse]);

        // Act
        const result = await ReportSafetyIncidents('Fire', 'photo.jpg', 40.7128, -74.0060, 'Fire', 'Building A');

        // Assert
        expect(result).toBe(1);
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO incidents(description, photo, latitude, longitude, type, date, building_name) VALUES(?, ?, ?, ?, ?, ?,?)',
            ['Fire', 'photo.jpg', 40.7128, -74.0060, 'Fire', expect.any(Date), 'Building A']
        );
    });

    test('ReportSafetyIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(ReportSafetyIncidents('Fire', 'photo.jpg', 40.7128, -74.0060, 'Fire', 'Building A')).rejects.toThrow(`Server error : ${errorMessage}`);
    });

    test('deleteAllIncidents should delete all incidents and return a message', async () => {
        // Arrange
        pool.query.mockResolvedValue(undefined);

        // Act
        const result = await deleteAllIncidents();

        // Assert
        expect(result).toEqual({ message: "Deleted all incident reports" });
        expect(pool.query).toHaveBeenCalledWith('DELETE FROM incidents');
    });

    test('deleteAllIncidents should handle errors', async () => {
        // Arrange
        const errorMessage = 'Database error';
        pool.query.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(deleteAllIncidents()).rejects.toThrow(`Server error : ${errorMessage}`);
    });
});
