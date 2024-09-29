const request = require('supertest');
const express = require('express');
const router = require('../../../routes/userRoutes');
const UserInformationController = require('../../../controllers/UserInformationController');

const app = express();
app.use(express.json()); 
app.use('/users-details', router);

// Mocking the UserInformationController methods
jest.mock('../../../controllers/UserInformationController');
rma
describe('User Infotion API', () => {
    describe('GET /users-details/user-information', () => {
        it('should return a list of user information', async () => {
            const mockUserData = [{ id: 1, firstnames: 'John', lastnames: 'Doe' }];
            UserInformationController.getAllUserInfo.mockResolvedValue(mockUserData);

            const response = await request(app).get('/users-details/user-information');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserData);
            expect(UserInformationController.getAllUserInfo).toHaveBeenCalled();
        });

        it('should return 500 if there is an error', async () => {
            UserInformationController.getAllUserInfo.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/users-details/user-information');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });

    describe('POST /users-details/user-information', () => {
        it('should insert user information and return it', async () => {
            const newUserInfo = {
                firstnames: 'Jane',
                lastnames: 'Doe',
                student_number: '123456',
                gender: 'Female',
                date_of_birth: '2000-01-01',
                allergies: 'None',
                firstcontact_id: 1,
                secondcontact_id: 2
            };

            UserInformationController.InsertUserInfo.mockResolvedValue(newUserInfo);

            const response = await request(app)
                .post('/users-details/user-information')
                .send(newUserInfo);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(newUserInfo);
            expect(UserInformationController.InsertUserInfo).toHaveBeenCalledWith(
                newUserInfo.firstnames,
                newUserInfo.lastnames,
                newUserInfo.student_number,
                newUserInfo.gender,
                newUserInfo.date_of_birth,
                newUserInfo.allergies,
                newUserInfo.firstcontact_id,
                newUserInfo.secondcontact_id
            );
        });

        it('should return 500 if there is an error', async () => {
            const newUserInfo = { firstnames: 'Jane' }; // Incomplete data for test
            UserInformationController.InsertUserInfo.mockRejectedValue(new Error('Insert error'));

            const response = await request(app)
                .post('/users-details/user-information')
                .send(newUserInfo);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Serve error: Insert error' });
        });
    });
});
