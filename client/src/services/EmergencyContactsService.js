/**
 * File: EmergencyContactsService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for emergency contacts (wits and external).
 */

/*
    Function: fetch_contacts

    Description:
        Fetches list of emergency contacts and organizes into arrays and objects
    
    Parameters: N/A

    Returns:
        Array of varied objects and sub-arrays containing contact info
*/
export async function fetch_contacts() {
    const res = await fetch('/emergencycontacts/emergency-contacts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((contacts) => {
        const emergency_contacts = {
            wits_contacts: [],
            external_contacts: []
        }
        
        const wits_contact_groups = []
        const external_contact_groups = []

        contacts.forEach(contact => {
            
            const name = contact.name;
            const cell_number = contact.cellNumber;
            const contact_group = contact.contactGroup;
            const service_group = contact.serviceGroup;
            
            if (contact_group === "Wits") {
                if (!(wits_contact_groups.includes(service_group))) {
                    wits_contact_groups.push(service_group);
                    emergency_contacts.wits_contacts.push({
                        contact_group_name: service_group,
                        contacts: []
                    })
                }

                for (let i = 0; i < emergency_contacts.wits_contacts.length; i++) {
                    if (emergency_contacts.wits_contacts[i].contact_group_name === service_group) {
                        emergency_contacts.wits_contacts[i].contacts.push({
                            name: name,
                            phone_num: cell_number
                        })
                    }
                }

            } else if (contact_group === "External") {
                if (!(external_contact_groups.includes(service_group))) {
                    external_contact_groups.push(service_group);
                    emergency_contacts.external_contacts.push({
                        contact_group_name: service_group,
                        contacts: []
                    })
                }

                for (let i = 0; i < emergency_contacts.external_contacts.length; i++) {
                    if (emergency_contacts.external_contacts[i].contact_group_name === service_group) {
                        emergency_contacts.external_contacts[i].contacts.push({
                            name: name,
                            phone_num: cell_number
                        })
                    }
                }
            }

            
        });
        
        return emergency_contacts;
    })
    console.log(res);
    return res;
    
}