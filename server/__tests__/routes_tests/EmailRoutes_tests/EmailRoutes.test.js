
const request = require('supertest');
const express = require('express');
const router = require('../../../routes/EmailRoutes');
const emailService = require('../../../controllers/EmailService');

jest.mock('../../../controllers/EmailService', () => ({
    sendEmail: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(router);

describe('Ride Scheduler API', () => {
    describe('POST /store-time', () => {
        it('should store the time and return a 200 status', async () => {
            const time = '10:00 AM';

            const response = await request(app)
                .post('/store-time')
                .send({ time });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Time stored successfully' });
        });
    });

    describe('POST /store-residence', () => {
        beforeEach(() => {
            app.request.timeData = '10:00 AM';
        });

        it('should store the residence, send an email, and return a 200 status', async () => {
            const residence = 'Residence A';
            const subject = 'Scheduled Ride Confirmation';
            const text = `Your ride is scheduled at ${app.request.timeData}, and the residence you selected is ${residence}.`;

            emailService.sendEmail.mockResolvedValue();

            const response = await request(app)
                .post('/store-residence')
                .send({ residence });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Email sent successfully' });
            expect(emailService.sendEmail).toHaveBeenCalledWith('2561034@students.wits.ac.za', subject, text);
        });

        it('should return a 500 status if sending email fails', async () => {
            const residence = 'Residence A';

            emailService.sendEmail.mockRejectedValue(new Error('Email service failure'));

            const response = await request(app)
                .post('/store-residence')
                .send({ residence });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to send email: Email service failure' });
            expect(emailService.sendEmail).toHaveBeenCalledTimes(2);
        });
    });
});
