/*
    File : UserInformationController.js
    Description: Retrieve and insert user information to the database
    Type: Controller
 */
const pool = require("../db");

async function getAllUserInfo() {
    try {
        const [rows] = await pool.query('SELECT * FROM userinformation');
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

async function getUserInfo(student_num) {
    try {
        const [rows] = await pool.query(`SELECT * FROM userinformation WHERE StudentNumber='${student_num}'`);
        if (rows) {
            return rows[0];
        }
        return null;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

async function InsertUserInfo(firstnames, lastnames, student_number, gender, date_of_birth, allergies ) {
    try {
        await pool.query('INSERT INTO userinformation(FirstNames, LastNames, StudentNumber, Gender, DateOfBirth, Allergies) VALUES(?, ?, ?, ?, ?, ?)', [firstnames, lastnames, student_number, gender, date_of_birth, allergies ]);
        return "Data Inserted";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

async function UpdateUserInfo(student_number, firstnames, lastnames, student_number, gender, date_of_birth, allergies ) {
    try {
        await pool.query(`UPDATE userinformation set FirstNames='${firstnames}', LastNames='${lastnames}', Gender='${gender}', DateOfBirth='${date_of_birth}', Allergies='${allergies}' WHERE StudentNumber='${student_number}'`);
        return "User updated!";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

module.exports = {
    getAllUserInfo,
    InsertUserInfo,
    UpdateUserInfo,
    getUserInfo
}