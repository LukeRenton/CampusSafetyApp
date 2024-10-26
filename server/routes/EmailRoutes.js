const express = require('express');
const router = express.Router();
const emailService = require('../controllers/EmailService');

let timeData = ''; 
let residenceData = ''; 


router.post('/store-time', (req, res) => {
  const { time } = req.body;
  timeData = time; 
  console.log('Time received:', time);
  res.status(200).json({ message: 'Time stored successfully' });
});


router.post('/store-residence', async (req, res) => {
  const { residence } = req.body;
  residenceData = residence;
  console.log('Residence received:', residence);


  const subject = 'Scheduled Ride Confirmation';
  const text = `Your ride is scheduled at ${timeData}, and the residence you selected is ${residenceData}.`;

  try {
    await emailService.sendEmail('2561034@students.wits.ac.za', subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email: ' + error.message });
  }
});

module.exports = router;
