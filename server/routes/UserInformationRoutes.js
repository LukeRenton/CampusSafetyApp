/*
    File : User info  routes
    Type : Routes
    Description : API routes for User Information
    Base route : /users-details
*/

const express =  require('express');
const router = express.Router();
const UserInformationController = require('../controllers/UserInformationController');

//fetching data from the database (user information)
router.get("/user-information", async (req, res) => {
    try {
        const users_info = await UserInformationController.getAllUserInfo();
        res.status(200).json(users_info);
        
    } catch (err) {
        console.error('Error fetching Data: ' + err.message);
        res.status(500).json({message: err.message});
    }
});


//getting data from the body request then passing it to the controller to be inserted into the database.
router.post('/user-information', async (req, res) => {
    try {
        const {firstnames, lastnames, student_number, gender, DOB, allergies} = req.body;
        const InsertUserInfo = await UserInformationController.InsertUserInfo(firstnames, lastnames, student_number, gender, DOB, allergies);
        res.status(200).json(InsertUserInfo);
    } catch (err) {
        console.error('Error Insertin data : ' + err.message);
        res.status(500).json({message: 'Serve error: ' + err.message});
    }
});


module.exports = router;