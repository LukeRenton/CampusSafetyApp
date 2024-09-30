/*
    File : User info  routes
    Type : Routes
    Description : API routes for User Information
    Base route : /users-details
*/

const express =  require('express');
const router = express.Router();
const UserInformationController = require('../controllers/UserInformationController');

//fetching specific user from the DB
router.get("/user-information/:studentNumber", async (req, res) => {
    try {
        const studentNumber = req.params.studentNumber;
        const users_info = await UserInformationController.getUserInfo(2540440);
        res.status(200).json(users_info);
        
    } catch (err) {
        console.error('Error fetching Data: ' + err.message);
        res.status(500).json({message: err.message});
    }
});


//getting data from the body request then passing it to the controller to be inserted into the database.
router.post('/user-information', async (req, res) => {
    try {
        const {firstnames, lastnames, student_staff_num, gender, DOB, allergies, contactID1, contactID2} = req.body;
        console.log("contactID1: ", contactID1);
        console.log("contactID2: ", contactID2);
        const InsertUserInfo = await UserInformationController.InsertUserInfo(firstnames, lastnames, student_staff_num, gender, DOB, allergies, contactID1, contactID2);
        res.status(200).json(InsertUserInfo);
    } catch (err) {
        console.error('Error Insertin data : ' + err.message);
        res.status(500).json({message: 'Serve error: ' + err.message});
    }
});


module.exports = router;