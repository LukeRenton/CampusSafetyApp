/*
    File: IncidentController.js
    Type: Controller
    DEscription: Api for Incidents
 */


const pool = require("../db");

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

// Retrieve all reported safety incidents, including details, statuses, and locations, etc 
async function getAllIncidents() {
    try {
        const [rows] = await pool.query('SELECT * FROM incidents');
        // Map through the rows and ensure date is a Date object
        const formattedRows = rows.map(row => ({
            ...row,
            date: formatDate(new Date(row.date)) // Convert to Date object before formatting
        }));

        return formattedRows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

//Update the status of a safety incident
async function UpdateSafetyIncidents(id_val, active) {
    try {
        const id = Number(id_val);
        await pool.query('UPDATE incidents SET active = ? WHERE id = ?', [active, id]);
        const [rows] = await pool.query('SELECT id, active FROM incidents WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
        
    }
    
}

//Report a new safety incident  with location details and optional photo.
async function ReportSafetyIncidents(description, photo, latitude, longitude, type, building_name) {
    try {
        let date = new Date();
        
        //Convert date to SAST (+2)
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours() + 2;
        const minute = date.getMinutes();
        const seconds = date.getSeconds();
        const sast_date = new Date(year, month, day, hour, minute, seconds);
        await pool.query('INSERT INTO incidents(description, photo, latitude, longitude, type, date, building_name) VALUES(?, ?, ?, ?, ?, ?,?)', [description, photo, latitude, longitude, type, sast_date, building_name]);
        return "Data Inserted";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

// Delete all reported safety incidents
async function deleteAllIncidents() {
    try {
        await pool.query('DELETE FROM incidents');

        return {message: "Deleted all incident reports"};
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

module.exports = {
    getAllIncidents, 
    UpdateSafetyIncidents,
    ReportSafetyIncidents,
    deleteAllIncidents
};