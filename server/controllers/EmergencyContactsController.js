/*
EmergencyContactsController.js
Type: controller
Description: Provides the API backend logic for the Emergency Contacts information.
*/

const pool = require("../db");

// Insert a new emergency contact
async function insertEmergencyContact(name, cellNumber, contactGroup, serviceGroup) {
    try {
        // Insert a new row into the emergencyContacts table
        const result = await pool.query(
            "INSERT INTO emergencyContacts (name, cellNumber, contactGroup, serviceGroup) VALUES (?, ?, ?, ?)",
            [
                name,
                cellNumber,
                contactGroup,
                serviceGroup
            ]
        );
        
        console.log('Row inserted:', result.affectedRows);
        return result;
    } catch (error) {
        console.error('Error inserting emergency contact:', error);
        throw error;
    }
}

// Fetch all the emergency contacts
async function fetchEmergencyContacts() {
    try {
        // Select all rows from the emergencyContacts table
        const [rows] = await pool.query("SELECT * FROM emergencyContacts");
        console.log('All Emergency Contacts:', rows);
        return rows;
    } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        throw error;
    }
}

module.exports = {
    insertEmergencyContact,
    fetchEmergencyContacts
};
