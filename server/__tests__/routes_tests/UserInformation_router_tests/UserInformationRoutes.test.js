const request = require('supertest');
const express = require('express');
const userInformationRoutes = require('../../../routes/UserInformationRoutes');
const app = express();

app.use(express.json());
app.use('/api', userInformationRoutes);

jest.mock('../../../controllers/UserInformationController');
const UserInformationController = require('../../../controllers/UserInformationController');

describe('User Information Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test for fetching all user information
    test('GET /api/user-information should return all user information', async () => {
        const mockUsersInfo = [
            { student_number: '12345', firstnames: 'John', lastnames: 'Doe' }
        ];
        UserInformationController.getAllUserInfo.mockResolvedValue(mockUsersInfo);

        const response = await request(app).get('/api/user-information');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsersInfo);
        expect(UserInformationController.getAllUserInfo).toHaveBeenCalled();
    });

    // Test for handling errors when fetching all user information
    test('GET /api/user-information should handle errors', async () => {
        UserInformationController.getAllUserInfo.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/api/user-information');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Database error' });
    });

    // Test for fetching user information by student number
    test('GET /api/user-information/:studentNumber should return user information for a specific student number', async () => {
        const mockUserInfo = { student_number: '12345', firstnames: 'John', lastnames: 'Doe' };
        UserInformationController.getUserInfo.mockResolvedValue(mockUserInfo);

        const response = await request(app).get('/api/user-information/12345');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUserInfo);
        expect(UserInformationController.getUserInfo).toHaveBeenCalledWith('12345');
    });

    // Test for handling errors when fetching user information by student number
    test('GET /api/user-information/:studentNumber should handle errors', async () => {
        UserInformationController.getUserInfo.mockRejectedValue(new Error('User not found'));

        const response = await request(app).get('/api/user-information/12345');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'User not found' });
    });

    // Test for inserting new user information
    test('POST /api/user-information should insert new user information', async () => {
        const mockUserInfo = {
            firstnames: 'Jane',
            lastnames: 'Doe',
            student_number: '54321',
            gender: 'Female',
            DOB: '2000-01-01',
            allergies: 'None',
            contactID1: 1,
            contactID2: 2
        };
        const mockInsertResponse = { message: 'User inserted successfully' };
        UserInformationController.InsertUserInfo.mockResolvedValue(mockInsertResponse);

        const response = await request(app)
            .post('/api/user-information')
            .send(mockUserInfo);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockInsertResponse);
        expect(UserInformationController.InsertUserInfo).toHaveBeenCalledWith(
            mockUserInfo.firstnames,
            mockUserInfo.lastnames,
            mockUserInfo.student_number,
            mockUserInfo.gender,
            mockUserInfo.DOB,
            mockUserInfo.allergies,
            mockUserInfo.contactID1,
            mockUserInfo.contactID2
        );
    });

    // Test for handling errors when inserting new user information
    test('POST /api/user-information should handle errors', async () => {
        UserInformationController.InsertUserInfo.mockRejectedValue(new Error('Insert failed'));

        const mockUserInfo = {
            firstnames: 'Jane',
            lastnames: 'Doe',
            student_number: '54321',
            gender: 'Female',
            DOB: '2000-01-01',
            allergies: 'None',
            contactID1: 1,
            contactID2: 2
        };

        const response = await request(app).post('/api/user-information').send(mockUserInfo);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Serve error: Insert failed' });
    });

    // Test for updating user information
    test('PUT /api/update-user should update user information', async () => {
        const mockUpdateResponse = { message: 'User updated successfully' };
        UserInformationController.UpdateUserInfo.mockResolvedValue(mockUpdateResponse);

        const mockUpdateRequest = {
            firstnames: 'John',
            lastnames: 'Doe',
            student_number: '12345',
            gender: 'Male',
            DOB: '1999-01-01',
            allergies: 'None',
            first_emergency_contact_name: 'Jane Doe',
            first_emergency_contact_relationship: 'Sister',
            first_emergency_contact_cell_number: '555-5555',
            first_emergency_contact_work_number: '555-5556',
            second_emergency_contact_name: 'Jim Doe',
            second_emergency_contact_relationship: 'Brother',
            second_emergency_contact_cell_number: '555-5557',
            second_emergency_contact_work_number: '555-5558'
        };

        const response = await request(app).put('/api/update-user').send(mockUpdateRequest);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUpdateResponse);
        expect(UserInformationController.UpdateUserInfo).toHaveBeenCalledWith(
            mockUpdateRequest.firstnames,
            mockUpdateRequest.lastnames,
            mockUpdateRequest.student_number,
            mockUpdateRequest.gender,
            mockUpdateRequest.DOB,
            mockUpdateRequest.allergies,
            {
                name: mockUpdateRequest.first_emergency_contact_name,
                relationship: mockUpdateRequest.first_emergency_contact_relationship,
                cell_number: mockUpdateRequest.first_emergency_contact_cell_number,
                work_number: mockUpdateRequest.first_emergency_contact_work_number
            },
            {
                name: mockUpdateRequest.second_emergency_contact_name,
                relationship: mockUpdateRequest.second_emergency_contact_relationship,
                cell_number: mockUpdateRequest.second_emergency_contact_cell_number,
                work_number: mockUpdateRequest.second_emergency_contact_work_number
            }
        );
    });

    // Test for handling errors when updating user information
    test('PUT /api/update-user should handle errors', async () => {
        UserInformationController.UpdateUserInfo.mockRejectedValue(new Error('Update failed'));

        const mockUpdateRequest = {
            firstnames: 'John',
            lastnames: 'Doe',
            student_number: '12345',
            gender: 'Male',
            DOB: '1999-01-01',
            allergies: 'None',
            first_emergency_contact_name: 'Jane Doe',
            first_emergency_contact_relationship: 'Sister',
            first_emergency_contact_cell_number: '555-5555',
            first_emergency_contact_work_number: '555-5556',
            second_emergency_contact_name: 'Jim Doe',
            second_emergency_contact_relationship: 'Brother',
            second_emergency_contact_cell_number: '555-5557',
            second_emergency_contact_work_number: '555-5558'
        };

        const response = await request(app).put('/api/update-user').send(mockUpdateRequest);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Serve error: Update failed' });
    });
});
