/**
 * File: SideMenuItem.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Navigation item within the side menu
 */
import React from 'react'
import '../styles/SideMenuItem.css'

export default function SideMenuItem({ children, icon, styles }) {
  return (
    <button className='side-menu-item-root'>
      <img src={icon} className='side-menu-item-icon' style={styles}></img>
      <h2 className='side-menu-item-text'>{children}</h2>  
    </button>
  )
}
