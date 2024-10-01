const express = require('express');
const router = express.Router();
const { insertAlert, fetchAlerts, updateAlertStatus, deleteAlerts } = require('../controllers/SafetyAlertsController');

function formatDate(isoString) {
    const date = new Date(isoString);
    return {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1, // Months are zero-based, so add 1
    year: date.getUTCFullYear(),
    time: {
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes()
    }
    };
}

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
    console.log(clients);
    console.log(message);

    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify({ message })}\n\n`);
    });
};

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
        const id = await insertAlert(type, active, longitude, latitude, date);

        const newRecordMessage = {
            of_type: "alert",
            id: id,
            type: type,
            active: active,
            longitude: longitude,
            latitude: latitude,
            date: formatDate(new Date())
        };
    
        // Notify all connected clients
        notifyClients(newRecordMessage);

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


// DELETE endpoint to delete all alerts
router.delete('/alerts', async (req, res) => {
    try {
        const response = await deleteAlerts();
        res.status(200).json(response);
        //console.log(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
});



module.exports = router;