/**
 * File: Menu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Main page component to host items to be displayed on the main page (home page) of the app
 */
import React, { useEffect, useState } from 'react'
import Map from '../components/Map';
import '../styles/Main.css'
import { get_profile, get_blank_profile } from '../services/ProfileService'
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import SideMenu from '../components/SideMenu';
import NotificationsMenu from '../components/NotificationsMenu';
import IncidentReportsMenu from '../components/IncidentReportsMenu';
import EmergencyInfoMenu from '../components/EmergencyInfoMenu';
import FirstAidMenu from '../components/FirstAidMenu';
import MedicalProfileMenu from '../components/MedicalProfileMenu';

export default function Main() {

  // Hook variable for showing the side menu and current (open) menu
  const [show_side_menu, set_show_side_menu] = useState(false);
  const [current_menu, set_current_menu] = useState("medical_profile");
  
  const [user_profile, set_user_profile] = useState(get_blank_profile());
  
  useEffect(() => {
    const fetched_profile = get_profile();
    set_user_profile(fetched_profile);
  },[])
  
  /*
    Function: close_all_menus

    Description:
      Will close all popup menus
      Will be linked to onClick event of dark background so when user "clicks off" of a popup menu, it will close all other menus as well

    Arguments: N/A

    Returns: N/A
  */
  const close_all_menus = () => {
    set_current_menu("none");
    set_show_side_menu(false);
  }

  /*
    Function: close_menu

    Description:
      Closes the currently open menu

    Parameters: N/A

    Returns: N/A
  */
    const close_menu = () => {
      set_current_menu("none");
    }

  /*
    Function: render_menu

    Description:
      Renders the menu to be currently displayed on top of everything else

    Parameters: N/A

    Returns:
      A react or html component depending on the type of menu to be displayed
  */
  const render_menu = () => {
    switch (current_menu) {
      case "none":
        return <></>

      case "notifications":
        return <NotificationsMenu close_menu={close_menu}></NotificationsMenu> 

      case "incident_reports":
        return <IncidentReportsMenu close_menu={close_menu}></IncidentReportsMenu>

      case "emergency_info":
        return <EmergencyInfoMenu close_menu={close_menu}></EmergencyInfoMenu>
  
      case "first_aid":
        return <FirstAidMenu close_menu={close_menu}></FirstAidMenu>

      case "medical_profile":
        return <MedicalProfileMenu close_menu={close_menu} profile={user_profile}></MedicalProfileMenu>

      default:
        break;
    }
  }

  return (
    <main className='main-root'>
        {current_menu === "none" ? <></> : render_menu() }      
        <Navbar />
        <Topbar set_show_side_menu={set_show_side_menu} />
        <Map />
        <SideMenu show_side_menu={show_side_menu} set_current_menu={set_current_menu} profile={user_profile}/>
        {show_side_menu ? <div className='main-dark-back' onClick={close_all_menus}></div> : <></> }
    </main>
  )
}
