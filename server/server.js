const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

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