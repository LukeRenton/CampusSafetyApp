/*
LoginController.js
Type: Controller
Description: Provides the API backend logic for user login.
*/

const pool = require('../db');

// Function to validate user login
async function validateUserLogin(username, password) {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?;';
    const values = [username, password];
    const [rows] = await pool.query(query, values); // MySQL returns rows as an array
    return rows.length > 0; // Return true if user exists, false otherwise
}

module.exports = {
    validateUserLogin
};