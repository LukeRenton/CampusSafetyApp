const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
var os = require('os');

// API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Serve static files from the React app
machine_type = os.type();
console.log(machine_type);
if (machine_type == 'Windows_NT') { // This is needed for windows development
    app.use(express.static(path.join(__dirname, '../client/build')));
}
else{
    app.use(express.static(path.join(__dirname, 'client/build')));
}


// Handle requests to main react page
// NOTE: THIS ALL THE CODE BELOW HAS TO BE AT THE END OF THE FILE
// Any routes listed below will be handled by the React app
reactRoutes = [
    "*"
]
// All other GET requests not handled before will return the React app
app.get(reactRoutes, (req, res) => {
    if (machine_type == 'Windows_NT') { // This is needed for windows development
        app.use(express.static(path.join(__dirname, '../client/build')));
    }
    else{
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
