
const request = require('supertest');
const express = require('express');
const router = require('../../../routes/UserContactsRoutes');
const { insertUserContact, fetchUserContacts } = require('../../../controllers/UserContactsController');

jest.mock('../../../controllers/UserContactsController', () => ({
    insertUserContact: jest.fn(),
    fetchUserContacts: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(router);

describe('User Contacts API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /user-contacts', () => {
        it('should fetch all user contacts and return a 200 status', async () => {
            const mockContacts = [
                { id: 1, name: 'John Doe', relationship: 'Friend', cellNumber: '123-456-7890', workNumber: '555-1111' },
                { id: 2, name: 'Jane Smith', relationship: 'Family', cellNumber: '098-765-4321', workNumber: '555-2222' }
            ];
            fetchUserContacts.mockResolvedValue(mockContacts);

            const response = await request(app).get('/user-contacts');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockContacts);
            expect(fetchUserContacts).toHaveBeenCalledTimes(1);
        });

        it('should return a 500 status if fetching user contacts fails', async () => {
            fetchUserContacts.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/user-contacts');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch User Contacts' });
            expect(fetchUserContacts).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST /user-contacts', () => {
        it('should create a new user contact and return a 201 status with the ID of the new contact', async () => {
            const newContact = {
                name: 'Alice Green',
                relationship: 'Coworker',
                cellNumber: '555-1234',
                workNumber: '555-5678'
            };
            const mockInsertID = 3;

            insertUserContact.mockResolvedValue(mockInsertID);

            const response = await request(app)
                .post('/user-contacts')
                .send(newContact);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'User Contact created successfully', id: mockInsertID });
            expect(insertUserContact).toHaveBeenCalledWith(
                newContact.name,
                newContact.relationship,
                newContact.cellNumber,
                newContact.workNumber
            );
            expect(insertUserContact).toHaveBeenCalledTimes(1);
        });

        it('should return a 500 status if creating a user contact fails', async () => {
            insertUserContact.mockRejectedValue(new Error('Database error'));

            const newContact = {
                name: 'Bob Brown',
                relationship: 'Family',
                cellNumber: '555-5678',
                workNumber: '555-8765'
            };

            const response = await request(app)
                .post('/user-contacts')
                .send(newContact);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create User Contact' });
            expect(insertUserContact).toHaveBeenCalledTimes(1);
        });
    });
});
