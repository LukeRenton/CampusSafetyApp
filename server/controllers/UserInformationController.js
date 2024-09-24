/*
    File : UserInformationController.js
    Description: Retrieve and insert user information to the database
    Type: Controller
 */
const pool = require("../db");

async function getAllUserInfo() {
    try {
        const [rows] = await pool.query('SELECT * FROM incidents');

        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

async function InsertUserInfo(firstnames, lastnames, student_number, gender, date_of_birth, allergies,firstcontact_id, secondcontact_id ) {
    try {
        await pool.query('INSERT INTO students(FirstNames, LastNames, StudentNumber, Gender, DateOfBirth, Allergies, FirstContactId, SecondContactId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [firstnames, lastnames, student_number, gender, date_of_birth, allergies,firstcontact_id, secondcontact_id ]);
        return "Data Inserted";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

module.exports = {
    getAllUserInfo,
    InsertUserInfo
}