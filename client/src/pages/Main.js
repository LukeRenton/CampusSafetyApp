/**
 * File: Menu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Main page component to host items to be displayed on the main page (home page) of the app
 */
import React, { useState } from 'react'
import Map from '../components/Map';
import '../styles/Main.css'
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import SideMenu from '../components/SideMenu';
import NotificationsMenu from '../components/NotificationsMenu';
import IncidentReportsMenu from '../components/IncidentReportsMenu';
import EmergencyInfoMenu from '../components/EmergencyInfoMenu';
import FirstAidMenu from '../components/FirstAidMenu';

export default function Main() {

  // Hook variable for showing the side menu and current (open) menu
  const [show_side_menu, set_show_side_menu] = useState(false);
  const [current_menu, set_current_menu] = useState("first_aid");

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
        <SideMenu show_side_menu={show_side_menu} set_current_menu={set_current_menu}/>
        {show_side_menu ? <div className='main-dark-back' onClick={close_all_menus}></div> : <></> }
    </main>
  )
}
