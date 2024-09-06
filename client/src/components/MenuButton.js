
/**
 * File: MenuButton.js
 * 
 * Author: Mitchell
 * 
 * Descipription:
 *  Menu button to allow user to open the side menu
 */
import React from 'react'
import '../styles/MenuButton.css'
import menu_icon from '../icons/menu.svg'

export default function MenuButton( props ) {
  return (
    <button className='menu-button-root' onClick={props.on_click}>
        <img className='menu-button-icon' src={menu_icon}></img>
    </button>
  )
}
