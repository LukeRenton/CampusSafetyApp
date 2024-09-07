/*
    File : IncidentSRoutes
    Type : Routes
    Description : API routes for Incidents Page
    Base route : /incidents
*/

const express =  require('express');
const router = express.Router();
const IncidentController = require('../controllers/IncidentController');

router.get("/all-incidents", async (req, res) => {
    try {
        const AllIncidents = await IncidentController.getAllIncidents();
        res.status(200).json(AllIncidents);
        
    } catch (err) {
        console.error('Error fetching all the Incident Reports: ' + err.message);
        res.status(500).json({message: err.message});
    }
});


// The id should be for the status that should be updated
// The status in body, is the updated value of status
router.patch('/:id/status', async (req, res) => {
    try {
        const id_value = req.params.id;
        const status = req.body;
        const UpdateStatus = await IncidentController.UpdateSafetyIncidents(id_value, status);
        res.status(200).json(UpdateStatus);
    } catch (err) {
        console.error('Error Updating the status : ' + err.message);
        res.status(500).json({message: 'Serve error: ' + err.message});
    }
});

router.post('/report-incidents', async (req, res) => {
    try {
        const {description, photo, latitude, longitude, building_name} = req.body;
        const reportIncident = await IncidentController.ReportSafetyIncidents(description, photo, latitude, longitude, building_name);
        res.status(200).json(reportIncident);
    } catch (err) {
        console.error('Error Inserting data: '+ err.message);
        res.status(500).json({message: 'Server error: '+ err.message});
    }
});

module.exports = router;