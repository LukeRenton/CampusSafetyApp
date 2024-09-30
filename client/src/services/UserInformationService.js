import { string_to_date } from "./DateTimeService";

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
                DOB: string_to_date(user_profile.dob),
                allergies: user_profile.allergens
            })

        }).then((res) => res.json());

        if (res.ok) {
            console.log(res);
        }
    
    } catch (err) {
        console.log(err);
    }
}