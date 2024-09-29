/*
SAFETYRESOURCESCONTROLLER.JS
Type: controller
Description: Provides the API backend logic for the Safety Resources information.
*/
const pool = require('../db');
async function getSafetyResourcesByType(type){
    try {
        const [rows] = await pool.query('SELECT * FROM SafetyResources WHERE type = ?', [type]);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw new Error('Server error: ' + err.message);
    }
}

async function getAllSafetyResources(){
    try {
        const [rows] = await pool.query('SELECT * FROM SafetyResources');
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Server error: ' + err.message);
    }
}

module.exports = {
    getSafetyResourcesByType,
    getAllSafetyResources
};