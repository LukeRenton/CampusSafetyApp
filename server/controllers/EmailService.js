const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'anandpatel1221178@gmail.com',
    pass: 'cngo snsi ouwo tgcc',
  },
});


async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'anandpatel1221178@gmail.com',
    to: to, 
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendEmail,
};
