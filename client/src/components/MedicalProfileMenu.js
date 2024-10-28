/**
 * File: MedicalProfileMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu component showing medical profile of individual
 */
import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import '../styles/MedicalProfileMenu.css'
import clipboard from '../icons/clipboard.svg'
import EditMedicalProfile from './EditMedicalProfile'
import { string_to_date, years_between } from '../services/DateTimeService'
import account_icon from '../icons/account.svg'

export default function MedicalProfileMenu( { studentNumber, close_menu, profile, get_user_profile } ) {

    const [show_edit_medical_profile, set_show_edit_medical_profile] = useState(false);
    const [screen_lock, set_screen_lock] = useState(null);
    
    /*
        Function: get_screen_lock

        Description:
            Locks the screen so that the screen stays on when medical profile is being displayed

        Parameters: N/A

        Returns: N/A
    */
    const get_screen_lock = async () => {
        let screen_lock_temp;
        
        try {
            screen_lock_temp = await navigator.wakeLock.request('screen');
            set_screen_lock(screen_lock_temp);
        } catch (err) {
            set_screen_lock(null);
        }
    }

    /*
        Function: release_screen_lock

        Description:
            Releases the screen lock so the screen can dim for power saving

        Parameters: N/A

        Returns: N/A
    */
    const release_screen_lock = async () => {
        if (screen_lock) {
            await screen_lock.release();
        }
    }

    /*
        Function: handle_close_menu

        Description:
            Closes the medical profile menu

        Parameters: N/A

        Returns: N/A
    */
    const handle_close_menu = () => {
        release_screen_lock();
        close_menu();
    }

    // When component is loaded, lock the screen so it does not turn off
    // -- this ensures that the medical profile is displayed at all times
    useEffect(() => {
        get_screen_lock();
    },[])

  return (
    <>
        <Menu menu_header={"Medical Profile"} close={handle_close_menu}>
            {!show_edit_medical_profile ?
            <section className='medical-profile-menu-content'>
                <section className='medical-profile-menu-screen-on'>
                    <img className='medical-profile-menu-screen-on-icon' alt="clipboard icon" src={clipboard}></img>
                    <h4 className='medical-profile-menu-screen-on-text'>This profile will keep the screen on for emergency reasons</h4>
                </section>
                <article className='medical-profile-menu-box'>
                    <section className='medical-profile-menu-main-personal'>
                        <div className='medical-profile-menu-main-personal-image' style={{backgroundImage: `url(${account_icon})`}}></div>
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
                            <h3 className='medical-profile-menu-info-item-value'>
                                {profile.dob.substr(0,10)} | {profile.dob !=='-' ? years_between(string_to_date(profile.dob.substr(0,10))) : '-'}
                            </h3>
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
            :
            <EditMedicalProfile get_user_profile={get_user_profile} close_edit_menu={() => {set_show_edit_medical_profile(false)}} user_profile={profile}></EditMedicalProfile>
            }
        </Menu>
    </>
  )
}
