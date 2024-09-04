/*
SAFETYRESOURCESCONTROLLER.JS
Type: controller
Description: Provides the API backend logic for the Safety Resources information.
*/

function getSafetyResourcesByType(type){
    // Below is filler code, we would just run a sql query in a real application
    const safetyResources = getAllSafetyResources();
    const resources = safetyResources.resources.filter(resource => resource.type === type);
    return resources;
}

function getAllSafetyResources(){
    // This would be retrieved from a database in a real application
    return {
        "title": "Safety Resources",
        "resources": [
            {
                "title": "Safety Resource 1",
                "description": "This is a description of Safety Resource 1.",
                "link": "https://www.google.com",
                "type": "fire"
            },
            {
                "title": "Safety Resource 2",
                "description": "This is a description of Safety Resource 2.",
                "link": "https://www.google.com",
                "type": "lightning"
            },
            {
                "title": "Safety Resource 3",
                "description": "This is a description of Safety Resource 3.",
                "link": "https://www.google.com",
                "type": "earthquake"
            },
            {
                "title": "Safety Resource 4",
                "description": "This is a description of Safety Resource 4.",
                "link": "https://www.google.com",
                "type": "medical"
            },
            {
                "title": "Safety Resource 5",
                "description": "This is a description of Safety Resource 5.",
                "link": "https://www.google.com",
                "type": "fire"
            }
        ]
    };
}

module.exports = {
    getSafetyResourcesByType,
    getAllSafetyResources
};