/**
 * File: ProfileService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service to handle profile fetching
 */

import { convert_date_string_to_sql_valid, string_to_date } from "./DateTimeService";


/*
    Function: get_profile

    Description:
      Fetches the user profile from the server

    Arguments:
      studentNumber - The student number of the user

    Returns:
      The user profile
*/
// TODO: implement response failure handling
export async function get_profile(studentNumber) {
    try{
        const response = await fetch(`/users/user-information/${studentNumber}`).then((res) => res.json());
        const full_profile = response[0];
        console.log(full_profile);
        const profile = {
            first_names: full_profile.FirstNames,
            last_name: full_profile.LastNames,
            student_staff_num: full_profile.StudentNumber,
            gender : full_profile.Gender,
            dob: full_profile.DateOfBirth,
            age: '-',
            allergens: full_profile.Allergies,
            first_emergency_contact: {
                name: full_profile.firstContactName,
                relationship: full_profile.firstContactRelationship,
                cell: full_profile.firstContactCellNumber,
                work: full_profile.firstContactWorkNumber
            },
            second_emergency_contact: {
                name: full_profile.secondContactName,
                relationship: full_profile.secondContactRelationship,
                cell: full_profile.secondContactCellNumber,
                work: full_profile.secondContactWorkNumber
            }
        }
        console.log(profile);
        return profile;
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        return get_blank_profile();
    }
}
/*
    Function: get_demo_profile

    Description:
      Returns a sample profile

    Arguments: N/A

    Returns:
      Sample user profile
*/

export function get_demo_profile() {
    const sample_profile = {
        first_names: 'Mary Anne',
        last_name: 'Jane',
        student_staff_num: '2009812',
        gender: 'female',
        dob: '10/08/2002',
        age: '22',
        allergens: 'Hayfever, crayfish, nuts (all), gluten',
        first_emergency_contact: {
            name: 'Mr. Harry Jane',
            relationship: 'Husband',
            cell: '092 976 1718',
            work: '078 898 4197'
        },
        second_emergency_contact: {
            name: 'Mrs. Harriot Hathinson',
            relationship: 'Mother',
            cell: '062 197 1974',
            work: '-'
        }
    }

    return sample_profile;
}

/*
    Function: get_blank_profile

    Description:
      Returns a sample/blank profile

    Arguments: N/A

    Returns:
      Blank user profile
*/
export function get_blank_profile() {
    const blank_profile = {
        first_names: '-',
        last_name: '-',
        student_staff_num: '-',
        gender: '-',
        dob: '-',
        age: '-',
        allergens: '-',
        first_emergency_contact: {
            name: '-',
            relationship: '-',
            cell: '-',
            work: '-'
        },
        second_emergency_contact: {
            name: '-',
            relationship: '-',
            cell: '-',
            work: '-'
        }
    }

    return blank_profile;
}




export async function update_user_info(user_profile) {
    console.log(user_profile);

    // firstnames, lastnames, student_number, gender, DOB, allergies
    try {
        const res = await fetch('/users/update-user', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstnames: user_profile.first_names,
                lastnames: user_profile.last_name,
                student_number: user_profile.student_staff_num,
                gender: user_profile.gender,
                DOB: convert_date_string_to_sql_valid(user_profile.dob),
                allergies: user_profile.allergens,
                first_emergency_contact_name: user_profile.first_emergency_contact.name,
                first_emergency_contact_relationship: user_profile.first_emergency_contact.relationship,
                first_emergency_contact_cell_number: user_profile.first_emergency_contact.cell,
                first_emergency_contact_work_number: user_profile.first_emergency_contact.work,
                second_emergency_contact_name: user_profile.second_emergency_contact.name,
                second_emergency_contact_relationship: user_profile.second_emergency_contact.relationship,
                second_emergency_contact_cell_number: user_profile.second_emergency_contact.cell,
                second_emergency_contact_work_number: user_profile.second_emergency_contact.work
            })

        }).then((res) => res.json());

        if (res.ok) {
            console.log(res);
        }
    
    } catch (err) {
        console.log(err);
    }
}