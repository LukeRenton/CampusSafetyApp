const express = require('express');
const router = express.Router();
const { insertAlert, fetchAlerts, updateAlertStatus } = require('../controllers/SafetyAlertsController');



// Store connected clients
let clients = [];

// SSE endpoint for client connection
router.get('/pushalerts', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Add client to the clients array
    clients.push(res);

    console.log('Client connected');

    // Remove client when connection is closed
    req.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== res);
        res.end();
    });
});

// Function to send notification to all connected clients
const notifyClients = (message) => {
    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify({ message })}\n\n`);
    });
};

// Simulated POST endpoint to trigger notifications
router.post('/new-record', (req, res) => {

    const newRecordMessage = {
        desc: 'replace with actual reported incident description'
    };

    // Notify all connected clients
    notifyClients(newRecordMessage);

    res.status(201).send('Notification sent');
});

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