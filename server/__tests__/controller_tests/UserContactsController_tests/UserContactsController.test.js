
const { insertUserContact, fetchUserContacts } = require('../../../controllers/UserContactsController');
const pool = require('../../../db');


jest.mock('../../../db', () => ({
    query: jest.fn(),
}));

describe('UserContactsController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('insertUserContact', () => {
        it('should insert a new user contact and return the insert ID', async () => {
            const mockResult = [{ affectedRows: 1, insertId: 123 }];
            pool.query.mockResolvedValue(mockResult);

            const name = 'Alice Green';
            const relationship = 'Friend';
            const cellNumber = '555-1234';
            const workNumber = '555-5678';

            const result = await insertUserContact(name, relationship, cellNumber, workNumber);
            expect(result).toBe(123);
            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO usercontacts (name, relationship, cellNumber, workNumber) VALUES (?, ?, ?, ?)",
                [name, relationship, cellNumber, workNumber]
            );
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should log an error if insertion fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            pool.query.mockRejectedValue(new Error('Database error'));

            const name = 'Alice Green';
            const relationship = 'Friend';
            const cellNumber = '555-1234';
            const workNumber = '555-5678';

            await insertUserContact(name, relationship, cellNumber, workNumber);
            expect(consoleSpy).toHaveBeenCalledWith('Error inserting user contact:', expect.any(Error));
            expect(pool.query).toHaveBeenCalledTimes(1);

            consoleSpy.mockRestore();
        });
    });

    describe('fetchUserContacts', () => {
        it('should fetch all user contacts and return the result', async () => {
            const mockRows = [
                { id: 1, name: 'John Doe', relationship: 'Family', cellNumber: '123-456-7890', workNumber: '555-1111' },
                { id: 2, name: 'Jane Smith', relationship: 'Friend', cellNumber: '098-765-4321', workNumber: '555-2222' }
            ];
            pool.query.mockResolvedValue([mockRows]);

            const result = await fetchUserContacts();
            expect(result).toEqual(mockRows);
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM usercontacts");
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it('should log an error if fetching contacts fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            pool.query.mockRejectedValue(new Error('Database error'));
            await fetchUserContacts();
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching User Contacts:', expect.any(Error));
            expect(pool.query).toHaveBeenCalledTimes(1);

            consoleSpy.mockRestore();
        });
    });
});
