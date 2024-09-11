/**
 * File: SideMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Side menu holding information and other nav options
 */
import React from 'react'
import { useState } from 'react';
import '../styles/SideMenu.css'
import SideMenuItem from './SideMenuItem'

import sample_student_pic from '../media/sample_student_pic.png'

import notifications from '../icons/notifications.svg'
import reports from '../icons/reports.svg'
import info from '../icons/info.svg'
import heart from '../icons/heart.svg'
import car from '../icons/car.svg'
import signout from '../icons/signout.svg'

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
                <div className='side-menu-profile-image-container' style={{backgroundImage: `url(${sample_student_pic})`}}>
                    {/* <img className='side-menu-profile-image' src={sample_student_pic}></img> */}
                </div>
                <section className='side-menu-profile-info'>
                    <section className='side-menu-profile-name-num'>
                        <h1 className='side-menu-profile-name'>Mary Anne Jane</h1>
                        <h2 className='side-menu-profile-student-num'>2009812</h2>
                    </section>
                    <button className='side-menu-view-profile'>View Medical Profile</button>
                </section>
            </article>
            <ul className='side-menu-navigations'>
                <li className='side-menu-nav-item side-menu-notifications'><SideMenuItem icon={notifications}>Notifications</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-reports'><SideMenuItem icon={reports}>Incident Reports</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-info'><SideMenuItem icon={info}>Emergency Information</SideMenuItem></li>
                <li className='side-menu-nav-item side-menu-first-aid'><SideMenuItem icon={heart}>First Aid Information</SideMenuItem></li>
                <li className="side-menu-nav-item side-menu-walk-home"onClick={handleWalkHomeClick}><SideMenuItem icon={car}>Walk-home assistance</SideMenuItem></li>              
            </ul>
                {/* Render PopupCard only when isPopupOpen is true */}
                <PopupCard isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
                    <p>Walk-home assistance information goes here.</p>
                </PopupCard>
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
