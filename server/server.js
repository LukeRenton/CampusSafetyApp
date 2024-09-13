const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const LoginRoutes = require('./routes/LoginRoutes');
const SafetyResourcesRoutes = require('./routes/SafetyResourcesRoutes');
const SafetyAlertsRoutes = require('./routes/SafetyAlertsRoutes');
var os = require('os');
app.use(express.json());
// API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});
app.use('/users', LoginRoutes);
app.use('/resources', SafetyResourcesRoutes); // Send any /resources requests to SafetyResourcesRoutes (e.g. /resources/safety-resources will be sent to SafetyResourcesRoutes)
app.use('/alerts', SafetyAlertsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));


// Handle requests to main react page
// NOTE: THIS ALL THE CODE BELOW HAS TO BE AT THE END OF THE FILE
// Any routes listed below will be handled by the React app
reactRoutes = [
    "*"
]
// All other GET requests not handled before will return the React app
app.get(reactRoutes, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
