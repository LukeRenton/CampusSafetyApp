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