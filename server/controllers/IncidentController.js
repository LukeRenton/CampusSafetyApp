/*
    File: IncidentController.js
    Type: Controller
    DEscription: Api for Incidents
 */


const pool = require("../db");

// Retrieve all reported safety incidents, including details, statuses, and locations, etc 
async function getAllIncidents() {
    try {
        const [rows] = await pool.query('SELECT * FROM incidents '); //assumming the table is named incidents
        return rows;
    }
    catch(err)
    {
        console.error(err);
        throw new Error("Server error : " + err.message);
        
    }
}

//Update the status of a safety incident
async function UpdateSafetyIncidents(id) {
    try {
        await pool.query('UPDATE status WHERE id = ?', [id]);
        const [rows] = await pool.query('SELECT id, status WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
        
    }
    
}

//Report a new safety incident  with location details and optional photo.
// Assuming that this is the order of the table columns and there is a table called incidents

async function ReportSafetyIncidents(description, photo, latitude, longitude, building_name, timestamp) {
    try {
        await pool.query('INSERT INTO incidents(description, photo, latitude, logitude, building_name, timestamp) VALUES(?, ?, ?, ?, ?, ?)', [description, photo, latitude, longitude, building_name, timestamp]);
        
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}