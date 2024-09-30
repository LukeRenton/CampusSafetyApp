import React, { useState } from 'react'
import '../styles/EditMedicalProfile.css'
import { update_user_info } from '../services/ProfileService';
import { date_to_dashed_string, string_to_date } from '../services/DateTimeService';
import Spinner from './Spinner';
import Loader from './Loader';

// TODO : Validate form fiesl
// TODO : use contexts to store user data and autofill the form
export default function EditMedicalProfile( { user_profile, close_edit_menu, get_user_profile } ) {
  console.log(user_profile);
  const [profile, setProfile] = useState({
    first_names: user_profile.first_names, //+
    last_name: user_profile.last_name, //+
    student_staff_num: user_profile.student_staff_num, //+
    gender: user_profile.gender, //+
    dob: user_profile.dob.substr(0, 10), //+
    allergens: user_profile.allergens, //+
    first_emergency_contact: {
      name: user_profile.first_emergency_contact.name, //+
      relationship: user_profile.first_emergency_contact.relationship, //+
      cell: user_profile.first_emergency_contact.cell, //+
      work: user_profile.first_emergency_contact.work //+
    },
    second_emergency_contact: {
      name: user_profile.second_emergency_contact.name, //+
      relationship: user_profile.second_emergency_contact.relationship, //+
      cell: user_profile.second_emergency_contact.cell, //+
      work: user_profile.second_emergency_contact.work //+ 
    }
  });

  const [uploading_info, set_uploading_info] = useState(false);

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
    set_uploading_info(true);
    update_user_info(profile).then(() => {
      set_uploading_info(false);
      get_user_profile();
      close_edit_menu();
    })
  };

  const handleCancel = () => {
    close_edit_menu();
  }

  return (
    <div className='edit-medical-profile-root'>
      <section className={'edit-medical-profile-content '+(uploading_info ? 'edit-medical-profile-content-disabled' : '')}>
        <h2 className='edit-medical-profile-heading'>Personal Profile</h2>
        <section className='edit-medical-profile-section'>

          <label>Student/Staff Number:</label>
          <input
            type='text'
            name='student_staff_num'
            value={profile.student_staff_num}
            onChange={handleInputChange}
            disabled='true'
            className='edit-medical-profile-input edit-medical-profile-student-num'
          />

          <label>First Names:</label>
          <input
            type='text'
            name='first_names'
            value={profile.first_names}
            onChange={handleInputChange}
            className='edit-medical-profile-input'
          />

          <label>Last Name:</label>
          <input
            type='text'
            name='last_name'
            value={profile.last_name}
            onChange={handleInputChange}
            className='edit-medical-profile-input'
          />

          <label>Gender:</label>
          <input
            type='text'
            name='gender'
            value={profile.gender}
            onChange={handleInputChange}
            className='edit-medical-profile-input'
          />

          <label>Date of Birth:</label>
          <input
            type='date'
            name='dob'
            value={profile.dob}
            onChange={handleInputChange}
            className='edit-medical-profile-input'
          />

          <label>Allergens:</label>
          <input
            type='text'
            name='allergens'
            value={profile.allergens}
            onChange={handleInputChange}
            className='edit-medical-profile-input'
          />
        </section>

        {/* Emergency Contacts */}
        <h2 className='edit-medical-profile-heading'>First Emergency Contact</h2>
        <section className='edit-medical-profile-section'>

          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={profile.first_emergency_contact.name}
            onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
            className='edit-medical-profile-input'
          />

          <label>Relationship:</label>
          <input
            type='text'
            name='relationship'
            value={profile.first_emergency_contact.relationship}
            onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
            className='edit-medical-profile-input'
          />

          <label>Cell No.:</label>
          <input
            type='text'
            name='cell'
            value={profile.first_emergency_contact.cell}
            onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
            className='edit-medical-profile-input'
          />

          <label>Work Phone No.:</label>
          <input
            type='text'
            name='work'
            value={profile.first_emergency_contact.work}
            onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
            className='edit-medical-profile-input'
          />
        </section>

        <h2 className='edit-medical-profile-heading'>Second Emergency Contact</h2>
        <section className='edit-medical-profile-section'>

          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={profile.second_emergency_contact.name}
            onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
            className='edit-medical-profile-input'
          />

          <label>Relationship:</label>
          <input
            type='text'
            name='relationship'
            value={profile.second_emergency_contact.relationship}
            onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
            className='edit-medical-profile-input'
          />

          <label>Cell No.:</label>
          <input
            type='text'
            name='cell'
            value={profile.second_emergency_contact.cell}
            onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
            className='edit-medical-profile-input'
          />

          <label>Work Phone No.:</label>
          <input
            type='text'
            name='work'
            value={profile.second_emergency_contact.work}
            onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
            className='edit-medical-profile-input'
          />
        </section>
      </section>

      <section className='edit-medical-profile-buttons'>
        <button className='edit-medical-profile-save' onClick={handleSubmit}>{uploading_info ? <Loader size={40} report_type={'natural'}></Loader> : 'Save Profile'}</button>
        <button className={'edit-medical-profile-cancel '+(uploading_info ? 'edit-medical-profile-cancel-disabled' : '')} onClick={handleCancel}>Cancel</button>
      </section>

    </div>
  );
}
