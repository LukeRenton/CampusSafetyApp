/**
 * File: FirstAid.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Arrays and objects containing first aid steps important to user
 */
import medical from '../icons/medical.svg'

const general_health_assistance = {
    header: 'General Health Assistance',
    icon: medical,
    steps: [
        {
            header: 'Call an ambulance',
            description: 'Before anything else, call a medical emergency service immediately! Listen to their assistance before proceeding'
        },
        {
            header: 'Check for a pulse',
            description: "To check for blood flow, position your index and middle finger on the patient's wrist. You should feel a beating sensation. If not, you need to proceed to CPR (see CPR first aid guide). If you do feel a pulse, move to the next step."
        },
        {
            header: 'Health checklist',
            description: "Check the patient for any and all health issues. This will be important information for the paramedics: Loss of conciousness, Seizure or fit, Burns, Bruising, Scratches, Bite marks, Stings, Other skin abrasions, etc."
        },
        // {
            // header: "Important Tips",
            // description: "Make sure the patient is breathing properly\nb. If the patient is bleeding, apply intense pressure to the wound (with gloves or other protection)\nc. If the patient has a fire burn, run the burn under cold water\nd. If the patient is having a seizure/fit, place them on their side and protect from injury. Let the fit proceed."
        // }
    ]
}

export default general_health_assistance