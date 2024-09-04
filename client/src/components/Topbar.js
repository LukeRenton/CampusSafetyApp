/**
 * File: Topbar.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Bar at top of screen to host menu button and emergency call button
 */
import React from 'react'
import EmergencyCall from './EmergencyCall'
import MenuButton from './MenuButton'
import '../styles/Topbar.css'

export default function Topbar() {
  return (
    <div className='topbar-root'>
        <MenuButton></MenuButton>
        <EmergencyCall></EmergencyCall>
    </div>
  )
}
