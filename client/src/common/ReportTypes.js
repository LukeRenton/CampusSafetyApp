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
        header: 'Health Emergency Alert',
        colour: colours['medical_blue'],
        icon: medical
    },
    'fire': {
        type: 'fire',
        header: 'Fire Emergency Alert',
        colour: colours['fire_red'],
        icon: fire
    },
    'weather': {
        type: 'weather',
        header: 'Weather Emergency Alert',
        colour: colours['weather_gray'],
        icon: weather
    },
    'natural': {
        type: 'natural',
        header: 'Natural Disaster Emergency Alert',
        colour: colours['natural_green'],
        icon: natural
    },
    'security': {
        type: 'security',
        header: 'Security Emergency Alert',
        colour: colours['safety_orange'],
        icon: security
    }
}

export default report_types;

