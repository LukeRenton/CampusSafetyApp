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
import medical_marker from '../icons/medical_marker.svg'
import fire_marker from '../icons/fire_marker.svg'
import weather_marker from '../icons/weather_marker.svg'
import natural_marker from '../icons/natural_marker.svg'
import security_marker from '../icons/security_marker.svg'

import spinner_red from '../lotties/spinner_red.json'
import spinner_blue from '../lotties/spinner_blue.json'
import spinner_gray from '../lotties/spinner_gray.json'
import spinner_green from '../lotties/spinner_green.json'
import spinner_orange from '../lotties/spinner_orange.json'



const report_types = {
    'medical': {
        type: 'medical',
        header: 'Health Emergency',
        colour: colours['medical_blue'],
        icon: medical,
        icon_size: 45,
        marker: medical_marker,
        report_causes: ["Emergency services to be notified", "People in the area to be notified", "Your profile to be displayed for emergency reasons"],
        radius: 0.01,
        spinner: spinner_blue
    },
    'fire': {
        type: 'fire',
        header: 'Fire Emergency',
        colour: colours['fire_red'],
        icon: fire,
        icon_size: 70,
        marker: fire_marker,
        report_causes: ["Fire services to be notified", "People in the area to be notified", "A wide scale evacuation alert"],
        radius: 0.05,
        spinner: spinner_red
    },
    'weather': {
        type: 'weather',
        header: 'Weather Emergency',
        colour: colours['weather_gray'],
        icon: weather,
        icon_size: 60,
        marker: weather_marker,
        report_causes: ["People in the area to be notified", "A wide scale emergency alert"],
        radius: 0.02,
        spinner: spinner_gray
    },
    'natural': {
        type: 'natural',
        header: 'Natural Disaster Emergency',
        colour: colours['natural_green'],
        icon: natural,
        icon_size: 70,
        marker: natural_marker,
        report_causes: ["Emergency services to be notified", "People in the area to be notified", "A wide scale evacuation alert"],
        radius: 0.1,
        spinner: spinner_green
    },
    'security': {
        type: 'security',
        header: 'Security Emergency',
        colour: colours['safety_orange'],
        icon: security,
        icon_size: 60,
        marker: security_marker,
        report_causes: ["Campus Safety services to be notified", "People in the area to be notified", "A wide scale safety alert"],
        radius: 0.02,
        spinner: spinner_orange
    }
}

export default report_types;

