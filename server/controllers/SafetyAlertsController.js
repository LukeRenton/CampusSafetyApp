/*
SafetyAlertsController.js
Type: controller
Description: Provides the API backend logic for the Safety Alerts information.
*/


const pool = require("../db");

async function insertAlert(message, status, affected_area, timestamp) {
    try {
        // Insert a new row into the alerts table
        const result = await pool.query(
            "INSERT INTO safetyalerts (message, status, affected_area, timestamp) VALUES (?, ?, ?, ?)",
            [
                message,            // Message parameter
                status,             // Explicitly set the status ('active', 'closed', etc.)
                affected_area,      // Affected area parameter
                timestamp || new Date()  // Timestamp parameter or current date
            ]
        );
        
        console.log('Row inserted:', result[0].affectedRows);
    } catch (error) {
        console.error('Error inserting alert:', error);
    }
}



async function fetchAlerts() {
    try {
        // Select all rows from the alerts table
        const [rows] = await pool.query("SELECT * FROM safetyalerts");
        console.log('All alerts:', rows);
        return rows;
    } catch (error) {
        console.error('Error fetching alerts:', error);
    }
}

async function updateAlertStatus(alertId, newStatus) {
    try {
        const [result] = await pool.query(
            "UPDATE safetyalerts SET status = ? WHERE id = ?",
            [newStatus, alertId]
        );
        
        if (result.affectedRows === 0) {
            console.log('No alert found with the given ID.');
        } else {
            console.log('Status updated successfully.');
        }
    } catch (error) {
        console.error('Error updating alert status:', error);
    }
}

// async function main() {
//     //await insertAlert(); // Insert a row
//     //await fetchAlerts(); // Fetch and display all rows
//     const alertId = 1; // Example alert ID
//     const newStatus = 'closed'; // Example new status
//     await insertAlert("Fire at Convacation", "active","West Campus");
//     await updateAlertStatus(alertId, newStatus); // Update the status
//     pool.end(); // Close the connection pool
// }

//main(); // Call the main function to run the operations


module.exports = {
    insertAlert,
    fetchAlerts,
    updateAlertStatus
  };
  
