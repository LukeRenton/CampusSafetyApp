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

export default function Topbar( props ) {
  return (
    <section className='topbar-root'>
        <MenuButton on_click={() => {props.set_show_side_menu(true)}}></MenuButton>
        <EmergencyCall></EmergencyCall>
    </section>
  )
}
