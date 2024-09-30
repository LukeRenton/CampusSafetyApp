/**
 * File: MedicalProfileMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu component showing medical profile of individual
 */
import React, { useState } from 'react'
import Menu from './Menu'
import '../styles/MedicalProfileMenu.css'
import clipboard from '../icons/clipboard.svg'
import sample_student_pic from '../media/sample_student_pic.png'
import EditMedicalProfile from './EditMedicalProfile'

export default function MedicalProfileMenu( { close_menu, profile } ) {

    const [show_edit_medical_profile, set_show_edit_medical_profile] = useState(false);

  return (
    <>
        {show_edit_medical_profile ? <EditMedicalProfile user_profile={profile}></EditMedicalProfile> : <></>}
        <Menu menu_header={"Medical Profile"} close={close_menu}>
        <section className='medical-profile-menu-content'>
            <section className='medical-profile-menu-screen-on'>
                <img className='medical-profile-menu-screen-on-icon' src={clipboard}></img>
                <h4 className='medical-profile-menu-screen-on-text'>This profile will keep the screen on for emergency reasons</h4>
            </section>
            <article className='medical-profile-menu-box'>
                <section className='medical-profile-menu-main-personal'>
                    <div className='medical-profile-menu-main-personal-image' style={{backgroundImage: `url(${sample_student_pic})`}}></div>
                    <section className='medical-profile-menu-main-personal-info'>
                        <section className='medical-profile-menu-info-name'>
                            <section className='medical-profile-menu-info-name-box'>
                                <h2 className='medical-profile-menu-info-item-name-header'>First Names</h2>
                                <h3 className='medical-profile-menu-info-item-name-value'>{profile.first_names}</h3>
                            </section>
                            <section className='medical-profile-menu-info-name-box'>
                                <h2 className='medical-profile-menu-info-item-name-header'>Last Name</h2>
                                <h3 className='medical-profile-menu-info-item-name-value'>{profile.last_name}</h3>
                            </section>
                        </section>
                        <section className='medical-profile-menu-info-item'>
                            <h2 className='medical-profile-menu-info-item-header'>Student/Staff Number</h2>
                            <h3 className='medical-profile-menu-info-item-value'>{profile.student_staff_num}</h3>
                        </section>
                    </section>
                </section>
            </article>
            <article className='medical-profile-menu-box'>
                <h2 className='medical-profile-menu-box-header'>General Information</h2>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Gender</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.gender}</h3>
                    </section>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>DOB | Age</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.dob} | {profile.age}</h3>
                    </section>
                </section>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Allergens</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.allergens}</h3>
                    </section>
                </section>
            </article>
            <article className='medical-profile-menu-box'>
                <h2 className='medical-profile-menu-box-header'>Contact Information</h2>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>First Emergency Contact</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.first_emergency_contact.name}</h3>
                    </section>
                </section>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Relationship to patient</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.first_emergency_contact.relationship}</h3>
                    </section>
                </section>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Cell no.</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.first_emergency_contact.cell}</h3>
                    </section>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Work phone no.</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.first_emergency_contact.work}</h3>
                    </section>
                </section>
                <section className='medical-profile-menu-row'> {/*Blank Section*/} </section>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Second Emergency Contact</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.second_emergency_contact.name}</h3>
                    </section>
                </section>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Relationship to patient</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.second_emergency_contact.relationship}</h3>
                    </section>
                </section>
                <section className='medical-profile-menu-row'>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Cell no.</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.second_emergency_contact.cell}</h3>
                    </section>
                    <section className='medical-profile-menu-info-item'>
                        <h2 className='medical-profile-menu-info-item-header'>Work phone no.</h2>
                        <h3 className='medical-profile-menu-info-item-value'>{profile.second_emergency_contact.work}</h3>
                    </section>
                </section>
            </article>
            <button className='medical-profile-edit' onClick={() => {set_show_edit_medical_profile(true)}}>
                Edit Profile
            </button>
            <div className='medical-profile-menu-scroll-bottom'></div>
        </section>
        </Menu>
    </>
  )
}
