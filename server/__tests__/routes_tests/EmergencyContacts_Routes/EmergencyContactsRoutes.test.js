

const request = require('supertest');
const express = require('express');
const router = require('../../../routes/EmergencyContactsRoutes');
const { insertEmergencyContact, fetchEmergencyContacts } = require('../../../controllers/EmergencyContactsController');


jest.mock('../../../controllers/EmergencyContactsController', () => ({
    insertEmergencyContact: jest.fn(),
    fetchEmergencyContacts: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(router);

describe('Emergency Contacts API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /emergency-contacts', () => {
        it('should fetch all emergency contacts and return a 200 status', async () => {
            const mockContacts = [
                { id: 1, name: 'John Doe', cellNumber: '123-456-7890', contactGroup: 'Family', serviceGroup: 'Medical' },
                { id: 2, name: 'Jane Smith', cellNumber: '098-765-4321', contactGroup: 'Friends', serviceGroup: 'Police' }
            ];
            fetchEmergencyContacts.mockResolvedValue(mockContacts);

            const response = await request(app).get('/emergency-contacts');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockContacts);
            expect(fetchEmergencyContacts).toHaveBeenCalledTimes(1);
        });

        it('should return a 500 status if fetching contacts fails', async () => {
            fetchEmergencyContacts.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/emergency-contacts');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch Emergency Contacts' });
            expect(fetchEmergencyContacts).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST /emergency-contacts', () => {
        it('should create a new emergency contact and return a 200 status', async () => {
            const newContact = {
                name: 'Alice Green',
                cellNumber: '555-1234',
                contactGroup: 'Work',
                serviceGroup: 'Fire Department'
            };

            insertEmergencyContact.mockResolvedValue();

            const response = await request(app)
                .post('/emergency-contacts')
                .send(newContact);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Emergency Contact created successfully' });
            expect(insertEmergencyContact).toHaveBeenCalledWith(
                newContact.name,
                newContact.cellNumber,
                newContact.contactGroup,
                newContact.serviceGroup
            );
            expect(insertEmergencyContact).toHaveBeenCalledTimes(1);
        });

        it('should return a 500 status if creating a contact fails', async () => {
            insertEmergencyContact.mockRejectedValue(new Error('Database error'));

            const newContact = {
                name: 'Bob Brown',
                cellNumber: '555-5678',
                contactGroup: 'School',
                serviceGroup: 'Hospital'
            };

            const response = await request(app)
                .post('/emergency-contacts')
                .send(newContact);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create Emergency Contact' });
            expect(insertEmergencyContact).toHaveBeenCalledTimes(1);
        });
    });
});
