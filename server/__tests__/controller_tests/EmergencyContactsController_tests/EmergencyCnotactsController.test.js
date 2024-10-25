
const { insertEmergencyContact, fetchEmergencyContacts } = require('../../../controllers/EmergencyContactsController');
const pool = require('../../../db');

// Mock the pool.query function
jest.mock('../../../db', () => ({
    query: jest.fn(),
}));

describe('EmergencyContactsController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('insertEmergencyContact', () => {
        it('should insert a new emergency contact and return the result', async () => {
            const mockResult = { affectedRows: 1, insertId: 123 };
            pool.query.mockResolvedValue([mockResult]);

            const name = 'John Doe';
            const cellNumber = '123-456-7890';
            const contactGroup = 'Family';
            const serviceGroup = 'Police';
            const result = await insertEmergencyContact(name, cellNumber, contactGroup, serviceGroup);
            expect(result).toEqual([mockResult]);
            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO emergencyContacts (name, cellNumber, contactGroup, serviceGroup) VALUES (?, ?, ?, ?)",
                [name, cellNumber, contactGroup, serviceGroup]
            );
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if insert fails', async () => {
            const errorMessage = 'Insert failed';
            pool.query.mockRejectedValue(new Error(errorMessage));

            const name = 'Jane Doe';
            const cellNumber = '987-654-3210';
            const contactGroup = 'Friends';
            const serviceGroup = 'Fire Department';
            await expect(insertEmergencyContact(name, cellNumber, contactGroup, serviceGroup)).rejects.toThrow(errorMessage);
            expect(pool.query).toHaveBeenCalledTimes(1);
        });
    });

    describe('fetchEmergencyContacts', () => {
        it('should fetch all emergency contacts', async () => {
            const mockRows = [
                { id: 1, name: 'John Doe', cellNumber: '123-456-7890', contactGroup: 'Family', serviceGroup: 'Police' },
                { id: 2, name: 'Jane Doe', cellNumber: '987-654-3210', contactGroup: 'Friends', serviceGroup: 'Fire Department' }
            ];
            pool.query.mockResolvedValue([mockRows]);
            const result = await fetchEmergencyContacts();
            expect(result).toEqual(mockRows);
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM emergencyContacts");
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if fetching contacts fails', async () => {
            const errorMessage = 'Fetch failed';
            pool.query.mockRejectedValue(new Error(errorMessage));
            await expect(fetchEmergencyContacts()).rejects.toThrow(errorMessage);
            expect(pool.query).toHaveBeenCalledTimes(1);
        });
    });
});
