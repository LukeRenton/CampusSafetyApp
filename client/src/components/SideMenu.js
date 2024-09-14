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

export default function SideMenu( props ) {  
  return (
    <section className={'side-menu-root '+(props.show_side_menu ? ' shown-side-menu' : '')}>
        <section className='side-menu-contents-top'>
            <article className='side-menu-profile'>
                <div className='side-menu-profile-image-container' style={{backgroundImage: `url(${sample_student_pic})`}}></div>
                <section className='side-menu-profile-info' onClick={() => props.set_current_menu('medical_profile')}>
                    <section className='side-menu-profile-name-num'>
                        <h1 className='side-menu-profile-name'>{props.profile.first_names} {props.profile.last_name}</h1>
                        <h2 className='side-menu-profile-student-num'>{props.profile.student_staff_num}</h2>
                    </section>
                    <button className='side-menu-view-profile'>View Medical Profile</button>
                </section>
            </article>
            <ul className='side-menu-navigations'>
                <li className='side-menu-nav-item side-menu-notifications' onClick={() => props.set_current_menu('notifications')}><SideMenuItem icon={notifications}>Notifications</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-reports' onClick={() => props.set_current_menu('incident_reports')} ><SideMenuItem icon={reports}>Incident Reports</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-info' onClick={() => props.set_current_menu('emergency_info')}><SideMenuItem icon={info}>Emergency Information</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-first-aid'  onClick={() => props.set_current_menu('first_aid')}><SideMenuItem icon={heart}>First Aid Information</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-walk-home'><SideMenuItem icon={car}>Walk-home assistance</SideMenuItem></li>                
            </ul>
        </section>
        <section className='side-menu-contents-bottom'>
            <button className='side-menu-signout-button'>
                <img src={signout} className='side-menu-signout-button-icon' style={{rotate: `180deg`}}></img>
                <h2 className='side-menu-signout-button-text'>Sign out</h2>  
            </button>
        </section>
    </section>
  )
}
