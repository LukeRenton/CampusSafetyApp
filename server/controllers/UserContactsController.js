/*
UserContactsController.js
Type: controller
Description: Provides the API backend logic for the User Contacts information.
*/

const pool = require("../db");

// Function to insert a new user contact
async function insertUserContact(name, relationship, cellNumber, workNumber) {
    try {
        // Insert a new row into the usercontacts table
        const result = await pool.query(
            "INSERT INTO usercontacts (name, relationship, cellNumber, workNumber) VALUES (?, ?, ?, ?)",
            [
                name,
                relationship,
                cellNumber,
                workNumber
            ]
        );

        console.log('Row inserted:', result[0].affectedRows);
        return result[0].insertId;
    } catch (error) {
        console.error('Error inserting user contact:', error);
    }
}

// Fetch all the User Contacts
async function fetchUserContacts() {
    try {
        // Select all rows from the User Contacts table
        const [rows] = await pool.query("SELECT * FROM usercontacts");
        console.log('All User Contacts:', rows);
        return rows;
    } catch (error) {
        console.error('Error fetching User Contacts:', error);
    }
}

module.exports = {
    insertUserContact,
    fetchUserContacts
};
