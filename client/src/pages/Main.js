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

export default function Main() {

  // Hook variable for showing the side menu
  const [show_side_menu, set_show_side_menu] = useState(false);

  /*
    Function: close_all_menus

    Description:
      Will close all popup menus
      Will be linked to onClick event of dark background so when user "clicks off" of a popup menu, it will close all other menus as well

    Arguments: N/A

    Returns: N/A
  */
  const close_all_menus = () => {
    set_show_side_menu(false);
  }

  return (
    <main className='main-root'>
        <Navbar />
        <Topbar set_show_side_menu={set_show_side_menu} />
        <Map />
        <SideMenu show_side_menu={show_side_menu}/>
        {show_side_menu ? <div className='main-dark-back' onClick={close_all_menus}></div> : <></> }
    </main>
  )
}
