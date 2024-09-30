import React, { useState } from 'react'
import '../styles/EditMedicalProfile.css'

// TODO : Validate form fiesl
// TODO : use contexts to store user data and autofill the form
export default function EditMedicalProfile() {
  const [profile, setProfile] = useState({
    user_info: {
      firstnames: '', //+
      lastnames: '', //+
      student_staff_num: '', //+
      gender: '', //+
      DOB: '', //+
      allergies: '', //+
      contactID1: null, //+
      contactID2: null //+
    },
    first_emergency_contact: {
      name: '', //+
      relationship: '', //+
      cellNumber: '', //+
      workNumber: '' //+
    },
    second_emergency_contact: {
      name: '', //+
      relationship: '', //+
      cellNumber: '', //+
      workNumber: '' //+ 
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      user_info: {
        ...prevState.user_info,
        [name]: value
      }
    }));
  };

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

  // Function to create a user contact and return its ID
  async function createUserContact(emergency_contact) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emergency_contact)
      };
      const response = await fetch('/contacts/user-contacts', requestOptions);
      const data = await response.json();
      console.log('User contact created successfully:', data);
      return data.id; // Return the contact ID
    } catch (error) {
      console.error('Error creating user contact:', error);
      return null;
    }
  }

  // Function to create user information using contact IDs
  async function createUserInformation(userInfo, contactID1, contactID2) {
    try {
      userInfo.contactID1 = contactID1;
      userInfo.contactID2 = contactID2;
      console.log('User Information:', userInfo);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      };
      const response = await fetch('/users/user-information', requestOptions);
      const data = await response.json();
      console.log('User information created successfully:', data);
    } catch (error) {
      console.error('Error creating user information:', error);
    }
  }

  const handleSubmit = async () => {
    console.log("In submit user info");
    try {
      // Wait for both emergency contact IDs
      const id1 = await createUserContact(profile.first_emergency_contact);
      const id2 = await createUserContact(profile.second_emergency_contact);
      await createUserInformation(profile.user_info, id1, id2);   
    } catch (error) {
      console.error('Error during profile submission:', error);
    }
  };


  return (
    <div className='edit-medical-profile-root'>
      <h2>Edit Medical Profile</h2>
    
      <section className='edit-medical-profile-section'>
        <label>First Names:</label>
        <input
          type='text'
          name='firstnames'
          value={profile.user_info.firstnames}
          onChange={handleInputChange}
        />

        <label>Last Name:</label>
        <input
          type='text'
          name='lastnames'
          value={profile.user_info.lastnames}
          onChange={handleInputChange}
        />

        <label>Student/Staff Number:</label>
        <input
          type='text'
          name='student_staff_num'
          value={profile.user_info.student_staff_num}
          onChange={handleInputChange}
        />

        <label>Gender:</label>
        <input
          type='text'
          name='gender'
          value={profile.user_info.gender}
          onChange={handleInputChange}
        />

        <label>Date of Birth:</label>
        <input
          type='date'
          name='DOB'
          value={profile.user_info.DOB}
          onChange={handleInputChange}
        />

        <label>Allergens:</label>
        <input
          type='text'
          name='allergies'
          value={profile.user_info.allergies}
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
          name='cellNumber'
          value={profile.first_emergency_contact.cellNumber}
          onChange={(e) => handleEmergencyContactChange(e, 'first_emergency_contact')}
        />

        <label>Work Phone No.:</label>
        <input
          type='text'
          name='workNumber'
          value={profile.first_emergency_contact.workNumber}
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
          name='cellNumber'
          value={profile.second_emergency_contact.cellNumber}
          onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
        />

        <label>Work Phone No.:</label>
        <input
          type='text'
          name='workNumber'
          value={profile.second_emergency_contact.workNumber}
          onChange={(e) => handleEmergencyContactChange(e, 'second_emergency_contact')}
        />
      </section>

      <button onClick={handleSubmit}>Save Profile</button>
    </div>
  );
}
