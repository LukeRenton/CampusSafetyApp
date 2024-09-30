import React, { useState } from 'react'
import '../styles/EditMedicalProfile.css'
import { update_user_info } from '../services/ProfileService';
import { string_to_date } from '../services/DateTimeService';

// TODO : Validate form fiesl
// TODO : use contexts to store user data and autofill the form
export default function EditMedicalProfile() {
  const [profile, setProfile] = useState({
    first_names: '', //+
    last_name: '', //+
    student_staff_num: '', //+
    gender: '', //+
    dob: '', //+
    allergens: '', //+
    first_emergency_contact: {
      name: '', //+
      relationship: '', //+
      cell: '', //+
      work: '' //+
    },
    second_emergency_contact: {
      name: '', //+
      relationship: '', //+
      cell: '', //+
      work: '' //+ 
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
    console.log(profile);
  };

  // const handleDOBChange = (e) => {
  //   const dob = string_to_date(e.target.value);
  //   setProfile({
  //     ...profile,
  //     dob: dob
  //   })
  // }

  const handleEmergencyContactChange = (e, contactType) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [contactType]: {
        ...profile[contactType],
        [name]: value
      }
    });

  };

  const handleSubmit = () => {
    // You can send this profile data to your endpoint
    console.log('Submitted Profile:', profile);
    update_user_info(profile);
  };

  return (
    <div className='edit-medical-profile-root'>
      <h2>Edit Medical Profile</h2>
    
      <section className='edit-medical-profile-section'>
        <label>First Names:</label>
        <input
          type='text'
          name='first_names'
          value={profile.first_names}
          onChange={handleInputChange}
        />

        <label>Last Name:</label>
        <input
          type='text'
          name='last_name'
          value={profile.last_name}
          onChange={handleInputChange}
        />

        <label>Student/Staff Number:</label>
        <input
          type='text'
          name='student_staff_num'
          value={profile.student_staff_num}
          onChange={handleInputChange}
        />

        <label>Gender:</label>
        <input
          type='text'
          name='gender'
          value={profile.gender}
          onChange={handleInputChange}
        />

        <label>Date of Birth:</label>
        <input
          type='date'
          name='dob'
          value={profile.dob}
          onChange={handleInputChange}
        />

        <label>Allergens:</label>
        <input
          type='text'
          name='allergens'
          value={profile.allergens}
          onChange={handleInputChange}
        />
      </section>

      {/* Emergency Contacts */}
      <section className='edit-medical-profile-section'>
        <h3>First Emergency Contact</h3>

        <label>Name:</label>
        <input
          type='text'
          name='name'
          value={profile.first_emergency_contact.name}
          onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
        />

        <label>Relationship:</label>
        <input
          type='text'
          name='relationship'
          value={profile.first_emergency_contact.relationship}
          onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
        />

        <label>Cell No.:</label>
        <input
          type='text'
          name='cell'
          value={profile.first_emergency_contact.cell}
          onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
        />

        <label>Work Phone No.:</label>
        <input
          type='text'
          name='work'
          value={profile.first_emergency_contact.work}
          onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
        />
      </section>

      <section className='edit-medical-profile-section'>
        <h3>Second Emergency Contact</h3>

        <label>Name:</label>
        <input
          type='text'
          name='name'
          value={profile.second_emergency_contact.name}
          onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
        />

        <label>Relationship:</label>
        <input
          type='text'
          name='relationship'
          value={profile.second_emergency_contact.relationship}
          onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
        />

        <label>Cell No.:</label>
        <input
          type='text'
          name='cell'
          value={profile.second_emergency_contact.cell}
          onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
        />

        <label>Work Phone No.:</label>
        <input
          type='text'
          name='work'
          value={profile.second_emergency_contact.work}
          onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
        />
      </section>

      <button onClick={handleSubmit}>Save Profile</button>
    </div>
  );
}
