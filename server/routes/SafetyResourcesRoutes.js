/*
SAFETYRESOURCES.JS
Type: routes
Description: Provides the API routes for the Safety Resources page.
Base route: /resources
*/

const express = require('express');
const router = express.Router();
const safetyResourcesController = require('../controllers/SafetyResourcesController');

router.get("/safety-resources", async (req, res) => {
    try{
        const safetyResources = await safetyResourcesController.getAllSafetyResources();
        res.status(200).json(safetyResources);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    
});

router.get('/safety-resources/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const safetyResources = await safetyResourcesController.getSafetyResourcesByType(type);
        res.status(200).json(safetyResources);
    } catch (err) {
        console.error('Error fetching safety resources:', err.message);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


module.exports = router;