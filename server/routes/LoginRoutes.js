const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const isValid = await loginController.validateUserLogin(username, password);
        if (isValid) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

module.exports = router;