const express = require('express');
const router = express.Router();
const { insertUserContact, fetchUserContacts } = require('../controllers/UserContactsController');

// GET endpoint to fetch all User Contacts
router.get('/user-contacts', async (req, res) => {
    try {
        const userContacts = await fetchUserContacts();
        res.status(200).json(userContacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch User Contacts' });
    }
});

// POST endpoint to create a new User Contact
router.post('/user-contacts', async (req, res) => {
    try {
        const { name, relationship, cellNumber, workNumber } = req.body;
        let insertID = await insertUserContact(name, relationship, cellNumber, workNumber);
        res.status(201).json({ message: 'User Contact created successfully' , id : insertID});
    } catch (error) {
        res.status(500).json({ error: 'Failed to create User Contact' });
    }
});

module.exports = router;
