/**
 * File: ReportTypes.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Array to store header, colour and icon information for different reporting types
 */
import colours from "./Colours"
import medical from '../icons/medical.svg'
import fire from '../icons/fire.svg'
import weather from '../icons/weather.svg'
import natural from '../icons/natural.svg'
import security from '../icons/security.svg'

const report_types = {
    'medical': {
        type: 'medical',
        header: 'Health Emergency',
        colour: colours['medical_blue'],
        icon: medical,
        report_causes: ["Emergency services to be notified", "People in the area to be notified", "Your profile to be displayed for emergency reasons"],
        radius: 0.01
    },
    'fire': {
        type: 'fire',
        header: 'Fire Emergency',
        colour: colours['fire_red'],
        icon: fire,
        report_causes: ["Fire services to be notified", "People in the area to be notified", "A wide scale evacuation alert"],
        radius: 0.05,
    },
    'weather': {
        type: 'weather',
        header: 'Weather Emergency',
        colour: colours['weather_gray'],
        icon: weather,
        report_causes: ["People in the area to be notified", "A wide scale emergency alert"],
        radius: 0.02
    },
    'natural': {
        type: 'natural',
        header: 'Natural Disaster Emergency',
        colour: colours['natural_green'],
        icon: natural,
        report_causes: ["Emergency services to be notified", "People in the area to be notified", "A wide scale evacuation alert"],
        radius: 0.1
    },
    'security': {
        type: 'security',
        header: 'Security Emergency',
        colour: colours['safety_orange'],
        icon: security,
        report_causes: ["Campus Safety services to be notified", "People in the area to be notified", "A wide scale safety alert"],
        radius: 0.02
    }
}

export default report_types;

