const express = require('express');
const router = express.Router();
const { insertAlert, fetchAlerts, updateAlertStatus } = require('../controllers/SafetyAlertsController');


// GET endpoint to fetch all alerts
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await fetchAlerts();
        res.status(200).json(alerts);
        //console.log(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
});

// POST endpoint to create a new alert
router.post('/alerts', async (req, res) => {
    try {
        const { type, active, longitude, latitude, date } = req.body;
        await insertAlert(type, active, longitude, latitude, date);
        res.status(200).json({ message: 'Alert created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create alert' });
    }
});

// PATCH endpoint to update the status of an alert
router.patch('/alerts/:alertId/active', async (req, res) => {
    const { alertId } = req.params;
    const { active } = req.body;

    try {
        // Ensure 'active' is passed as a boolean (true or false)
        await updateAlertStatus(parseInt(alertId), active === true);
        res.status(200).json({ message: 'Alert active status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update alert active status' });
    }
});



module.exports = router;