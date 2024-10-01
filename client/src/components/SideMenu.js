/**
 * File: SideMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Side menu holding information and other nav options
 */
import React, { useState } from 'react'
import '../styles/SideMenu.css'
import SideMenuItem from './SideMenuItem'

import sample_student_pic from '../media/sample_student_pic.png'

import notifications from '../icons/notifications.svg'
import reports from '../icons/reports.svg'
import info from '../icons/info.svg'
import heart from '../icons/heart.svg'
import car from '../icons/car.svg'
import signout from '../icons/signout.svg'
import fire_extinguisher from '../icons/fire_extinguisher.svg'

import account_icon from '../icons/account.svg'

//component imports
import PopupCard from "../components/PopupCard.js"



export default function SideMenu( props ) {
    // State to manage the popup
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Function to handle the walk home button click
    const handleWalkHomeClick = () => {
        setPopupOpen(true); // Open the popup
      };


  return (
    <section className={'side-menu-root '+(props.show_side_menu ? ' shown-side-menu' : '')}>
        <section className='side-menu-contents-top'>
            <article className='side-menu-profile'>
                <div className='side-menu-profile-image-container' style={{backgroundImage: `url(${account_icon})`}}></div>
                <section className='side-menu-profile-info' onClick={props.valid_profile ? () => props.set_current_menu('medical_profile'): () => {}}>
                    <section className='side-menu-profile-name-num'>
                        <h1 className='side-menu-profile-name'>{props.profile.first_names} {props.profile.last_name}</h1>
                        <h2 className='side-menu-profile-student-num'>{props.profile.student_staff_num}</h2>
                    </section>
                    <button className='side-menu-view-profile'>{props.valid_profile ? "View Medical Profile" : "Profile inaccessible. Please reload the page"}</button>
                </section>
            </article>
            <ul className='side-menu-navigations'>
                <li className='side-menu-nav-item side-menu-notifications' onClick={() => props.set_current_menu('notifications')}><SideMenuItem icon={notifications}>Notifications</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-reports' onClick={() => props.set_current_menu('incident_reports')} ><SideMenuItem icon={reports}>Incident Reports</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-info' onClick={() => props.set_current_menu('emergency_info')}><SideMenuItem icon={info}>Emergency Information</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-first-aid'  onClick={() => props.set_current_menu('first_aid')}><SideMenuItem icon={heart}>First Aid Information</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-first-aid'  onClick={() => props.set_current_menu('safety_resources')}><SideMenuItem icon={fire_extinguisher}>Safety Resources</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-walk-home' onClick={() => props.set_current_menu('walk_home')}><SideMenuItem icon={car}>Walk-home assistance</SideMenuItem></li>                
            </ul>
        </section>
        <section className='side-menu-contents-bottom'>
            <button className='side-menu-signout-button' onClick={props.handle_signout}>
                <img src={signout} className='side-menu-signout-button-icon' style={{rotate: `180deg`}}></img>
                <h2 className='side-menu-signout-button-text'>Sign out</h2>  
            </button>
        </section>
    </section>
  )
}
