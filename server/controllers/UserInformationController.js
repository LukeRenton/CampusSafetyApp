/*
    File : UserInformationController.js
    Description: Retrieve and insert user information to the database
    Type: Controller
 */
const pool = require("../db");

async function getUserInfo(studentNumber) {
    try {
        const [rows] = await pool.query(
            `SELECT 
                ui.StudentNumber, 
                ui.FirstNames, 
                ui.LastNames, 
                ui.Gender, 
                ui.DateOfBirth, 
                ui.Allergies, 
                fc.name AS firstContactName, 
                fc.relationship AS firstContactRelationship, 
                fc.cellNumber AS firstContactCellNumber, 
                fc.workNumber AS firstContactWorkNumber, 
                sc.name AS secondContactName, 
                sc.relationship AS secondContactRelationship, 
                sc.cellNumber AS secondContactCellNumber, 
                sc.workNumber AS secondContactWorkNumber
            FROM userinformation ui
            LEFT JOIN usercontacts fc ON ui.firstContactId = fc.userContactId
            LEFT JOIN usercontacts sc ON ui.secondContactId = sc.userContactId
            WHERE ui.StudentNumber = ?`, 
            [studentNumber]
        );
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


async function InsertUserInfo(firstnames, lastnames, student_number, gender, date_of_birth, allergies, firstContactId, secondContactId) {
    try {
        await pool.query('INSERT INTO userinformation(FirstNames, LastNames, StudentNumber, Gender, DateOfBirth, Allergies, firstContactId, secondContactId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [firstnames, lastnames, student_number, gender, date_of_birth, allergies, firstContactId, secondContactId]);
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
    getUserInfo,
    InsertUserInfo,
    UpdateUserInfo,
    getUserInfo
}