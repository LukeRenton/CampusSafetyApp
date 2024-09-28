const express = require('express');
const router = express.Router();
const { insertEmergencyContact, fetchEmergencyContacts } = require('../controllers/EmergencyContactsController');

// GET endpoint to fetch all Emergency Contacts
router.get('/emergency-contacts', async (req, res) => {
    try {
        const emergencyContacts = await fetchEmergencyContacts();
        res.status(200).json(emergencyContacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Emergency Contacts' });
    }
});

// POST endpoint to create a new Emergency Contact
router.post('/emergency-contacts', async (req, res) => {
    try {
        const { name, cellNumber, contactGroup, serviceGroup } = req.body;
        await insertEmergencyContact(name, cellNumber, contactGroup, serviceGroup);
        
        res.status(200).json({ message: 'Emergency Contact created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Emergency Contact' });
    }
});

module.exports = router;
