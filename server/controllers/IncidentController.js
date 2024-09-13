/*
    File: IncidentController.js
    Type: Controller
    DEscription: Api for Incidents
 */


const pool = require("../db");

// Retrieve all reported safety incidents, including details, statuses, and locations, etc 
async function getAllIncidents() {
    try {
        const [rows] = await pool.query('SELECT id, building_name, description,status, timestamp FROM incidents '); 
        return rows;
    }
    catch(err)
    {
        console.error(err);
        throw new Error("Server error : " + err.message);
        
    }
}

//Update the status of a safety incident
async function UpdateSafetyIncidents(id_val, status) {
    try {
        const id = Number(id_val);
        await pool.query('UPDATE incidents SET status = ? WHERE id = ?', [status, id]);
        const [rows] = await pool.query('SELECT id, status WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
        
    }
    
}

//Report a new safety incident  with location details and optional photo.
// Assuming that this is the order of the table columns and there is a table called incidents

async function ReportSafetyIncidents(description, photo, latitude, longitude, building_name) {
    try {
        await pool.query('INSERT INTO incidents(description, photo, latitude, longitude, building_name, timestamp) VALUES(?, ?, ?, ?, ?, NOW())', [description, photo, latitude, longitude, building_name]);
        return "Data Inserted";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

module.exports = {
    getAllIncidents, 
    UpdateSafetyIncidents,
    ReportSafetyIncidents
};