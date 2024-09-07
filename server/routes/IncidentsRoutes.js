/*
    File : IncidentSRoutes
    Type : Routes
    Description : API routes for Incidents Page
    Base route : /incidents
*/

const express =  require('express');
const router = express.Router();
const IncidentController = require('../controllers/IncidentController');
const { route } = require('./SafetyResourcesRoutes');

router.get("/incidents", async (req, res) => {
    try {
        const AllIncidents = await IncidentController.getAllIncidents();
        res.status(200).json(AllIncidents);
        
    } catch (err) {
        console.error('Error fetching all the Incident Reports: ' + err.message);
        res.status(500).json({message: err.message});
    }
});

router.patch('/incidents/:id/status', async (req, res) => {
    try {
        const id_value = req.params.id;
        const UpdateStatus = await IncidentController.UpdateSafetyIncidents(id_value);
        res.status(200).json(UpdateStatus);
    } catch (err) {
        console.error('Error Updating the status : ' + err.message);
        res.status(500).json({message: 'Serve error: ' + err.message});
    }
});

route.post('/incidents', async (req, res) => {
    try {
        const {description, photo, latitude, longitude, building_name, timestamp} = req.body;
        const reportIncidet = await IncidentController.ReportSafetyIncidents(description, photo, latitude, longitude, building_name, timestamp);
        res.status(200).json(reportIncidet);
    } catch (err) {
        console.error('Error Inserting data: '+ err.message);
        res.status(500).json({message: 'Server error: '+ err.message});
    }
});

module.exports = router;