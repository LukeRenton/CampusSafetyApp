const nodemailer = require('nodemailer');
const { sendEmail } = require('../../../controllers/EmailService');

jest.mock('nodemailer');

describe('sendEmail', () => {
    let mockSendMail;

    beforeAll(() => {
        mockSendMail = jest.fn().mockResolvedValue({ response: 'Email sent successfully' });
        nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send an email with the correct options', async () => {
        const to = 's2426591@gmail.com';
        const subject = 'Test Subject';
        const text = 'Test email content';

        await sendEmail(to, subject, text);

        expect(mockSendMail).toHaveBeenCalledWith({
            from: 'anandpatel1221178@gmail.com',
            to,
            subject,
            text,
        });
    });

    it('should log an error if email sending fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        mockSendMail.mockRejectedValueOnce(new Error('Failed to send email'));

        const to = 's2426591@gmail.com';
        const subject = 'Test Subject';
        const text = 'Test email content';

        await sendEmail(to, subject, text);

        expect(consoleSpy).toHaveBeenCalledWith('Error sending email:', expect.any(Error));
        consoleSpy.mockRestore();
    });
});
