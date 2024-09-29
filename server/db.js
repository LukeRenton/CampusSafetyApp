/*
DB.js
Type: database
Description: Provides the database connection for the application.
*/
require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a connection to the database using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true // Enable SSL connection
    }
});

module.exports = pool;
