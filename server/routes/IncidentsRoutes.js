/*
    File : IncidentSRoutes
    Type : Routes
    Description : API routes for Incidents Page
    Base route : /incidents
*/

const express =  require('express');
const router = express.Router();
const IncidentController = require('../controllers/IncidentController');
const multer = require('multer');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable }  = require("firebase/storage");
const { firebaseConfig } = require("../firebase");
initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

const BuildingName =  require("../BuildingNames");

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
        const {active} = req.body;
        const UpdateStatus = await IncidentController.UpdateSafetyIncidents(id_value, active);
        res.status(200).json(UpdateStatus);
    } catch (err) {
        console.error('Error Updating the status : ' + err.message);
        res.status(500).json({message: 'Serve error: ' + err.message});
    }
});

router.post('/report-incidents-external',upload.single('photo'), async (req, res) => {
    try {
        let photo;
        if(req.file)
        {
            const storageRef = ref(storage, `files/${req.file.name}`);
            const metadata = {
                contentType: req.file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            photo = await getDownloadURL(snapshot.ref);

        }else{
            photo = "";
        }
        
        let latitude, longitude;
        const {description, type, building_name} = req.body;
        //retrieve building's latitude and longitude, using building name
        const result = BuildingName(building_name);

        if (typeof result === "object") {
            latitude = result.latitude;
            longitude = result.longitude;
            const reportIncident = await IncidentController.ReportSafetyIncidents(description,photo, latitude, longitude, type, building_name);
            res.status(200).json(reportIncident);
        } else if (typeof result === "string") {
            console.log("Building not found");
            res.status(500).json({message: 'error: Building Not Found, Use full name.e.g Wits Flower Hall '}); 
        }
        
    } catch (err) {
        console.error('Error Inserting data: '+ err.message);
        res.status(500).json({message: 'Server error: '+ err.message});
    }
});
// Uploads the photo to firebase storage and get the url (the url of the image is inserted into mysql database)
router.post('/report-incidents',upload.single('photo'), async (req, res) => {
    try {
        let photo;

        if (req.file) {
            console.log("posting new incident");
            console.log(req);

            const storageRef = ref(storage, `files/${req.file.name}`);

            const metadata = {
                contentType: req.file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

            // Grab the public url
            photo = await getDownloadURL(snapshot.ref);

            console.log(photo);
        } else {
            photo = "";
        }

        const {description, latitude, longitude, type, building_name} = req.body;
        const reportIncident = await IncidentController.ReportSafetyIncidents(description,photo, latitude, longitude, type, building_name);
        res.status(200).json(reportIncident);
    } catch (err) {
        console.error('Error Inserting data: '+ err.message);
        res.status(500).json({message: 'Server error: '+ err.message});
    }
});


// Deletes all incidents from table
router.delete("/all-incidents", async (req, res) => {
    try {
        const response = await IncidentController.deleteAllIncidents();
        res.status(200).json(response);
    } catch (err) {
        console.error('Error deleting all the Incident Reports: ' + err.message);
        res.status(500).json({message: err.message});
    }
});


module.exports = router;