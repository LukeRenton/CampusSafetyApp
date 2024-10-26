
const { insertAlert, fetchAlerts, updateAlertStatus, deleteAlerts } = require('../../../controllers/SafetyAlertsController');
const pool = require('../../../db');

jest.mock('../../../db', () => ({
    query: jest.fn(),
}));

describe('SafetyAlertsController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('insertAlert', () => {
        it('should insert an alert and return the inserted ID', async () => {
            const mockResult = [{ insertId: 1 }];
            pool.query.mockResolvedValue(mockResult);

            const alertData = {
                type: 'Fire',
                status: 'active',
                longitude: '28.0453',
                latitude: '-26.2041',
            };

            // Act
            const result = await insertAlert(alertData.type, alertData.status, alertData.longitude, alertData.latitude);

            // Assert
            expect(result).toBe(1);
            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO safetyalerts (type, active, longitude, latitude, date) VALUES (?, ?, ?, ?, ?)",
                [
                    alertData.type,
                    alertData.status,
                    alertData.longitude,
                    alertData.latitude,
                    expect.any(Date)  
                ]
            );
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should log an error if insertion fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            pool.query.mockRejectedValue(new Error('Database error'));

            await insertAlert('Fire', 'active', '28.0453', '-26.2041');

            expect(consoleSpy).toHaveBeenCalledWith('Error inserting alert:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('fetchAlerts', () => {
        it('should fetch all alerts and return formatted results', async () => {
            const mockRows = [
                { id: 1, type: 'Fire', active: 'active', longitude: '28.0453', latitude: '-26.2041', date: '2023-10-23T10:00:00.000Z' },
                { id: 2, type: 'Flood', active: 'closed', longitude: '28.0500', latitude: '-26.2070', date: '2023-10-24T12:00:00.000Z' }
            ];
            pool.query.mockResolvedValue([mockRows]);

            const result = await fetchAlerts();
            expect(result).toEqual([
                {
                    ...mockRows[0],
                    date: {
                        day: 23,
                        month: 10,
                        year: 2023,
                        time: { hour: 10, minute: 0 }
                    }
                },
                {
                    ...mockRows[1],
                    date: {
                        day: 24,
                        month: 10,
                        year: 2023,
                        time: { hour: 12, minute: 0 }
                    }
                }
            ]);
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM safetyalerts");
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should log an error if fetching alerts fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            pool.query.mockRejectedValue(new Error('Database error'));

            await fetchAlerts();
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching alerts:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('updateAlertStatus', () => {
        it('should update the alert status and log success message', async () => {
            // Arrange
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            const mockResult = { affectedRows: 1 };
            pool.query.mockResolvedValue([mockResult]);

            const alertId = 1;
            const newStatus = 'closed';
            await updateAlertStatus(alertId, newStatus);

            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE safetyalerts SET active = ? WHERE id = ?",
                [newStatus, alertId]
            );
            expect(consoleSpy).toHaveBeenCalledWith('Status updated successfully.');
            consoleSpy.mockRestore();
        });

        it('should log an error if updating alert status fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            pool.query.mockRejectedValue(new Error('Database error'));

            await updateAlertStatus(1, 'closed');
            expect(consoleSpy).toHaveBeenCalledWith('Error updating alert status:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('deleteAlerts', () => {
        it('should delete all alerts and return success message', async () => {
            const mockResult = { affectedRows: 1 };
            pool.query.mockResolvedValue([mockResult]);

            const result = await deleteAlerts();
            expect(result).toEqual({ message: 'Deleted all alerts' });
            expect(pool.query).toHaveBeenCalledWith("DELETE FROM safetyalerts");
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should log an error if deleting alerts fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            pool.query.mockRejectedValue(new Error('Database error'));

            await deleteAlerts();

            expect(consoleSpy).toHaveBeenCalledWith('Error fetching alerts:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });
});
