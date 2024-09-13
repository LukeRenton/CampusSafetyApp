/**
 * File: EmergencyContacts.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Array of contacts details for in-wits and out-of-wits services
 */

const wits_protection_services = [
    {
        name: 'Braamfontein Campus East',
        phone_num: '011 717 4444'
    },
    {
        name: 'Braamfontein Campus West',
        phone_num: '011 717 1842'
    },
    {
        name: 'Health Sciences Campus',
        phone_num: '011 717 2232'
    },
    {
        name: 'Education Campus',
        phone_num: '011 717 3340'
    },
    {
        name: 'Business School Campus',
        phone_num: '011 717 3589'
    }
]

const wits_contacts = [
    {
        contact_group_name: 'Wits Protection Services',
        contacts: wits_protection_services
    }
]

const ambulance_services = [
    {
        name: 'Netcare Park Lane',
        phone_num: '011 480 4000'
    },
    {
        name: 'Donald Gordon Medical Center',
        phone_num: '086 100 3932'
    },
    {
        name: 'St John EMS Paramedics',
        phone_num: '086 178 5646'
    },
    {
        name: 'Johannesburg Central Ambulance Services',
        phone_num: '011 375 5911'
    }
]

const police_security_services = [
    {
        name: 'SAPS Hillbrow Police Station',
        phone_num: '011 488 6511'
    },
    {
        name: 'Johannesburg Metro Police',
        phone_num: '011 375 5911'
    }
]

const fire_services = [
    {
        name: 'Berea Fire Station',
        phone_num: '011 375 5911'
    },
    {
        name: 'Johannesburg Central Fire Station',
        phone_num: '011 375 5911'
    }
]

const external_contacts = [
    {
        contact_group_name: 'Ambulance Services Nearby',
        contacts: ambulance_services
    },
    {
        contact_group_name: 'Police/Security Services Nearby',
        contacts: police_security_services
    },
    {
        contact_group_name: 'Fire Services Nearby',
        contacts: fire_services
    }
]

const emergency_contacts = {
    wits_contacts: wits_contacts,
    external_contacts: external_contacts
}

export default emergency_contacts