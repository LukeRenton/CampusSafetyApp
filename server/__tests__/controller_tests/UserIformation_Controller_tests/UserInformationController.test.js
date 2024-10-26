const request = require('supertest');
const pool = require('../../../db');
const {
    getUserInfo,
    InsertUserInfo,
    UpdateUserInfo,
    getAllUserInfo,
    UpdateUserInfoTmp
} = require('../../../controllers/UserInformationController');


jest.mock('../../../db', () => ({
    query: jest.fn()
}));

describe('UserInformationController', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserInfo', () => {
        it('should retrieve user info by student number', async () => {
            const mockRows = [{
                StudentNumber: '123456',
                FirstNames: 'John',
                LastNames: 'Doe',
                Gender: 'M',
                DateOfBirth: '2000-01-01',
                Allergies: 'None',
                firstContactName: 'Jane Doe',
                firstContactRelationship: 'Mother',
                firstContactCellNumber: '123-456-7890',
                secondContactName: 'Jim Doe',
                secondContactRelationship: 'Father',
                secondContactCellNumber: '098-765-4321',
            }];
        
            pool.query.mockResolvedValue([mockRows]);
        
            const result = await getUserInfo('123456');
            expect(result).toEqual(mockRows);
        
            // Solution: Trim both strings to ignore minor formatting issues
            expect(pool.query.mock.calls[0][0].replace(/\s+/g, ' ').trim())
                .toBe(`SELECT 
                        ui.StudentNumber, 
                        ui.FirstNames, 
                        ui.LastNames, 
                        ui.Gender, 
                        ui.DateOfBirth, 
                        ui.Allergies, 
                        fc.name AS firstContactName, 
                        fc.relationship AS firstContactRelationship, 
                        fc.cellNumber AS firstContactCellNumber, 
                        fc.workNumber AS firstContactWorkNumber, 
                        sc.name AS secondContactName, 
                        sc.relationship AS secondContactRelationship, 
                        sc.cellNumber AS secondContactCellNumber, 
                        sc.workNumber AS secondContactWorkNumber
                    FROM userinformation ui
                    LEFT JOIN usercontacts fc ON ui.firstContactId = fc.userContactId
                    LEFT JOIN usercontacts sc ON ui.secondContactId = sc.userContactId
                    WHERE ui.StudentNumber = ?`.replace(/\s+/g, ' ').trim());
        
            expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['123456']);
        });
        

        it('should handle server error in getUserInfo', async () => {
            const mockError = new Error('DB error');
            pool.query.mockRejectedValue(mockError);

            await expect(getUserInfo('123456')).rejects.toThrow('Server error : DB error');
        });
    });

    describe('InsertUserInfo', () => {
        it('should insert user info successfully', async () => {
            pool.query.mockResolvedValue({});

            const result = await InsertUserInfo('John', 'Doe', '123456', 'M', '2000-01-01', 'None', 1, 2);
            expect(result).toEqual('Data Inserted');
            expect(pool.query).toHaveBeenCalledWith(
                'INSERT INTO userinformation(FirstNames, LastNames, StudentNumber, Gender, DateOfBirth, Allergies, firstContactId, secondContactId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
                ['John', 'Doe', '123456', 'M', '2000-01-01', 'None', 1, 2]
            );
        });

        it('should handle server error in InsertUserInfo', async () => {
            const mockError = new Error('DB error');
            pool.query.mockRejectedValue(mockError);

            await expect(InsertUserInfo('John', 'Doe', '123456', 'M', '2000-01-01', 'None', 1, 2))
                .rejects.toThrow('Server error : DB error');
        });
    });

    // describe('UpdateUserInfo', () => {
    //     it('should update user info successfully', async () => {
    //         const mockRows = [{ firstContactId: 1, secondContactId: 2 }];
            
    //         // Mock the pool.query calls
    //         pool.query.mockResolvedValueOnce({ affectedRows: 1 }); // Mock user info update
    //         pool.query.mockResolvedValueOnce([mockRows]); // Mock retrieving contact IDs
    //         pool.query.mockResolvedValueOnce({ affectedRows: 1 }); // Mock first contact update
    //         pool.query.mockResolvedValueOnce({ affectedRows: 1 }); // Mock second contact update
    
    //         const firstEmergencyContact = {
    //             name: 'Jane Doe',
    //             relationship: 'Mother',
    //             cell_number: '123-456-7890',
    //             work_number: '111-111-1111'
    //         };
    
    //         const secondEmergencyContact = {
    //             name: 'Jim Doe',
    //             relationship: 'Father',
    //             cell_number: '098-765-4321',
    //             work_number: '222-222-2222'
    //         };
    
    //         // Call the UpdateUserInfo function
    //         const result = await UpdateUserInfo('John', 'Doe', '123456', 'M', '2000-01-01', 'None', firstEmergencyContact, secondEmergencyContact);
    
    //         // Verify the result
    //         expect(result).toEqual('User updated!');
    
    //         // Check the queries were called with expected arguments
    //         expect(pool.query).toHaveBeenCalledWith(
    //             //expect.stringMatching(/UPDATE userinformation set FirstNames='John', LastNames='Doe', Gender='M', DateOfBirth=STR_TO_DATE\('2000-01-01','%Y-%m-%d'\), Allergies='None' WHERE StudentNumber='123456'/),
    //             expect.anything()
    //         );
    //         expect(pool.query).toHaveBeenCalledWith(
    //             expect.stringContaining("SELECT ui.firstContactId, ui.secondContactId"),
    //             ["123456"]
    //         );
    //         expect(pool.query).toHaveBeenCalledWith(
    //             expect.stringContaining("UPDATE usercontacts set name='Jane Doe'"),
    //             expect.anything()
    //         );
    //     });
    // });
    
    
    

    describe('getAllUserInfo', () => {
        it('should retrieve all user info by student number', async () => {
            const mockRows = [{
                StudentNumber: '123456',
                FirstNames: 'John',
                LastNames: 'Doe',
                Gender: 'M',
                DateOfBirth: '2000-01-01',
                Allergies: 'None',
            }];
            
            pool.query.mockResolvedValue([mockRows]);

            const result = await getAllUserInfo('123456');
            expect(result).toEqual(mockRows);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM userinformation ui WHERE ui.StudentNumber = ?', ['123456']);
        });

        it('should handle server error in getAllUserInfo', async () => {
            const mockError = new Error('DB error');
            pool.query.mockRejectedValue(mockError);

            await expect(getAllUserInfo('123456')).rejects.toThrow('Server error : DB error');
        });
    });

    describe('UpdateUserInfoTmp', () => {
        it('should update user info with temp contact ids', async () => {
            pool.query.mockResolvedValue({});
            
            const result = await UpdateUserInfoTmp();
            expect(result).toEqual('User updated!');
            expect(pool.query).toHaveBeenCalledWith(`UPDATE userinformation set FirstContactId=10, SecondContactId=11 WHERE StudentNumber='2540440'`);
        });

        it('should handle server error in UpdateUserInfoTmp', async () => {
            const mockError = new Error('DB error');
            pool.query.mockRejectedValue(mockError);

            await expect(UpdateUserInfoTmp()).rejects.toThrow('Server error : DB error');
        });
    });
});
