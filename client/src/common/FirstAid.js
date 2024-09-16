/**
 * File: FirstAid.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Arrays and objects containing first aid steps important to user
 */
import medical from '../icons/medical.svg'
import cpr_icon from '../icons/cpr.svg'
import unconcious_icon from '../icons/unconcious.svg'

const general_health_assistance = {
    header: 'General Health Assistance',
    icon: medical,
    icon_size: 25,
    steps: [
        {
            header: 'Call an ambulance',
            description: ['Before anything else, call a medical emergency service immediately!','Listen to their assistance before proceeding']
        },
        {
            header: 'Check for a pulse',
            description: ["To check for blood flow, position your index and middle finger on the patient's wrist.","You should feel a beating sensation.", "If not, you need to proceed to CPR (see CPR first aid guide).","If you do feel a pulse, move to the next step."]
        },
        {
            header: 'Health checklist',
            description: ["Check the patient for any and all health issues. This will be important information for the paramedics.","Loss of conciousness,", "Seizure or fit,", "Burns,", "Bruising,","Scratches,", "Bite marks,", "Stings,","Other skin abrasions,","etc."]
        },
        {
            header: "Important Tips",
            description: ["Make sure the patient is breathing properly","If the patient is bleeding, apply intense pressure to the wound (with gloves or other protection)","If the patient has a fire burn, run the burn under cold water","If the patient is having a seizure/fit, place them on their side and protect from injury. Let the fit proceed."]
        }
    ]
}

const cpr = {
    header: 'CPR',
    icon: cpr_icon,
    icon_size: 35,
    steps: [
        {
            header: 'Check the scene',
            description: ['Check around you to ensure that it is safe to do CPR','Use personal protective equipment when dealing with a patient']
        },
        {
            header: 'Check responsiveness',
            description: ["Use 'shout-tap-shout'","Shout the patient's name, or simply 'Hello, can you hear me?'","Tap the patient and check for responsiveness, breathing, and/or life-threatening bleeding or conditions","If the patient is unresponsive, not breathing or is only gasping, shout for help, call emergency services and get equipment"]
        },
        {
            header: 'Positioning',
            description: ["Kneel beside the person","Place the person on their back on a firm, flat surface"]
        },
        {
            header: "CPR: Step A",
            description: ["Give 30 chest compressions","Hand position: Two hands centered on the chest","Body position: Shoulders directly over hands, elbows locked","Depth: At least 2 inches","Rate: 100 to 120 per minute","Allow chest to return to normal position after each compression"]
        },
        {
            header: "CPR: Step B",
            description: ["Give 2 breaths","Open the airway to a past-neutral position using the head-tilt/chin-lift technique","Pinch the nose shut, take a normal breath and make complete seal over the person's mouth with your mouth","Ensure each breath lasts about 1 second and makes the chest rise; allow air to exit before giving the next breath", "Go back to STEP A and repeat this process"]
        }
    ]
}

const unconcious = {
    header: 'Unconcious Patient',
    icon: unconcious_icon,
    icon_size: 35,
    steps: [
        {
            header: 'Call an ambulance',
            description: ['Before anything else, call a medical emergency service immediately!','Listen to their assistance before proceeding']
        },
        {
            header: 'Check the patient',
            description: ["Check the person's airway, breathing and pulse. You should do this frequently while they are unconcious", "If the person is not breathing, begin CPR (see CPR guide)"]
        },
        {
            header: 'Check for injury',
            description: ["Check for any spinal injuries", "If you think there is a spinal injury, leave the person where you found them (as long as they continue breathing). If the person vomits, roll the entire body at one time to their side, making sure to support the neck and back to keep the head and body in the same position while you roll", "If there is no spinal injury, continue to the next step, otherwise keep the person warm until medical help arrives"]
        },
        {
            header: 'Positioning',
            description: ["Carefully roll the person towards you on their side","Bend the top leg so both the hip and knee are at right angles","Gently tilt their head back to keep the airway open","If breathing or pulse stops at any time, roll the person onto their back and begin CPR"]
        },
        {
            header: 'Types of unconcious',
            description: ["If you know more about why the patient is unconcious, consider the following tips:","Low blood sugar: Give the person something sweet to eat or drink once they are conscious again", "Choking: Begin CPR to help dislodge the object, or (if there is something blocking the airway that you can reach) try to remove blockages without pushing it farther into the airway. Continue until medical help arrives"]
        },
        {
            header: 'What not to do:',
            description: ["DO NOT give an unconscious person any food or drink.", "DO NOT leave the person alone.", "DO NOT place a pillow under the head of an unconscious person.", "DO NOT slap an unconscious person's face or splash water on their face to try to revive them."]
        }
    ]
}

const first_aid_guides = {
    general_health_assistance: general_health_assistance,
    cpr: cpr,
    unconcious: unconcious
}

export default first_aid_guides