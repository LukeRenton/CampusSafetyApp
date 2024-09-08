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
        const incident = req.body;
        await insertAlert(incident.message, incident.status, incident.affected_area, incident.timestamp);
        res.status(200).json({ message: 'Alert created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create alert' });
    }
});

// PATCH endpoint to update the status of an alert
router.patch('/alerts/:alertId/status', async (req, res) => {
    const { alertId } = req.params;
    const { status } = req.body;

    try {
        await updateAlertStatus(parseInt(alertId), status);
        res.status(200).json({ message: 'Alert status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update alert status' });
    }
});

module.exports = router;
