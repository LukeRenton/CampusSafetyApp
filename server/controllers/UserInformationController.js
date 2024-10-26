/*
    File : UserInformationController.js
    Description: Retrieve and insert user information to the database
    Type: Controller
 */
// const { convert_date_string_to_sql_valid } = require("../../client/src/services/DateTimeService");
// import { convert_date_string_to_sql_valid } from "../../client/src/services/DateTimeService";
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

async function getAllUserInfo(student_num) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM userinformation ui WHERE ui.StudentNumber = ?`, 
            [student_num]
        );
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

// async function getUserInfo(student_num) {
//     try {
//         const [rows] = await pool.query(`SELECT * FROM userinformation WHERE StudentNumber='${student_num}'`);
//         if (rows) {
//             return rows[0];
//         }
//         return null;
//     } catch (err) {
//         console.error(err);
//         throw new Error("Server error : " + err.message);
//     }
// }


async function InsertUserInfo(firstnames, lastnames, student_number, gender, date_of_birth, allergies, firstContactId, secondContactId) {
    try {
        await pool.query('INSERT INTO userinformation(FirstNames, LastNames, StudentNumber, Gender, DateOfBirth, Allergies, firstContactId, secondContactId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [firstnames, lastnames, student_number, gender, date_of_birth, allergies, firstContactId, secondContactId]);
        
        return "Data Inserted";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

async function UpdateUserInfo(firstnames, lastnames, student_number, gender, date_of_birth, allergies, first_emergency_contact, second_emergency_contact ) {
    try {

        await pool.query(`UPDATE userinformation set FirstNames='${firstnames}', LastNames='${lastnames}', Gender='${gender}', DateOfBirth=STR_TO_DATE('${date_of_birth}','%Y-%m-%d'), Allergies='${allergies}' WHERE StudentNumber='${student_number}'`);
        const [rows] = await pool.query(
            `SELECT  ui.firstContactId, ui.secondContactId
            FROM userinformation ui
            LEFT JOIN usercontacts fc ON ui.firstContactId = fc.userContactId
            LEFT JOIN usercontacts sc ON ui.secondContactId = sc.userContactId
            WHERE ui.StudentNumber = ?`, 
            [student_number]
        );
        console.log(rows);
        
        // GET THE CONTACT IDs
        const first_contact_id = rows[0].firstContactId;
        const second_contact_id = rows[0].secondContactId;
    
        // Update usercontacts table
        await pool.query(
            `UPDATE usercontacts set name='${first_emergency_contact.name}', relationship='${first_emergency_contact.relationship}', cellNumber='${first_emergency_contact.cell_number}', workNumber='${first_emergency_contact.work_number}' where userContactId='${first_contact_id}' `
        );
        await pool.query(
            `UPDATE usercontacts set name='${second_emergency_contact.name}', relationship='${second_emergency_contact.relationship}', cellNumber='${second_emergency_contact.cell_number}', workNumber='${second_emergency_contact.work_number}' where userContactId='${second_contact_id}' `
        );

        console.log(`the contact id's are ${first_contact_id} and ${second_contact_id}!`);

        return "User updated!";
    } catch (err) {
        console.error(err);
        throw new Error("Server error : " + err.message);
    }
}

async function UpdateUserInfoTmp() {
    try {
        await pool.query(`UPDATE userinformation set FirstContactId=10, SecondContactId=11 WHERE StudentNumber='2540440'`);
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
    getAllUserInfo,
    UpdateUserInfoTmp
}