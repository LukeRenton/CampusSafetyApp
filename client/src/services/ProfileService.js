/**
 * File: ProfileService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service to handle profile fetching
 */

/*
    Function: get_profile

    Description:
      Fetches profile of user

    Arguments: N/A

    Returns:
      User profile
*/
export function get_profile() {
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