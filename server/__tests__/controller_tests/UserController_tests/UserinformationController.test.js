const UserInformationController = require('../../../controllers/UserInformationController');
const pool = require('../../../db'); 

jest.mock('../../../db', () => ({
    query: jest.fn(),
}));

describe('UserInformationController', () => {
    describe('getAllUserInfo', () => {
        it('should return user information from the database', async () => {
            const mockData = [
                { id: 1, FirstNames: 'John', LastNames: 'Doe' },
                { id: 2, FirstNames: 'Jane', LastNames: 'Doe' }
            ];

            pool.query.mockResolvedValue([mockData]);

            const result = await UserInformationController.getAllUserInfo();

            expect(result).toEqual(mockData);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM incidents');
        });

        it('should throw an error if the database query fails', async () => {
            pool.query.mockRejectedValue(new Error('Database error'));

            await expect(UserInformationController.getAllUserInfo()).rejects.toThrow('Server error : Database error');
            expect(pool.query).toHaveBeenCalled();
        });
    });

    describe('InsertUserInfo', () => {
        it('should insert user information into the database', async () => {
            pool.query.mockResolvedValue(); // Simulate successful insertion

            const result = await UserInformationController.InsertUserInfo(
                'John', 'Doe', '123456', 'Male', '2000-01-01', 'None', 1, 2
            );

            expect(result).toEqual('Data Inserted');
            expect(pool.query).toHaveBeenCalledWith(
                'INSERT INTO students(FirstNames, LastNames, StudentNumber, Gender, DateOfBirth, Allergies, FirstContactId, SecondContactId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 
                ['John', 'Doe', '123456', 'Male', '2000-01-01', 'None', 1, 2]
            );
        });

        it('should throw an error if the insertion fails', async () => {
            pool.query.mockRejectedValue(new Error('Insert error'));

            await expect(UserInformationController.InsertUserInfo(
                'John', 'Doe', '123456', 'Male', '2000-01-01', 'None', 1, 2
            )).rejects.toThrow('Server error : Insert error');

            expect(pool.query).toHaveBeenCalled();
        });
    });
});
