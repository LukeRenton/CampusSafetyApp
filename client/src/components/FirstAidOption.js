/**
 * File: FirstAidOption.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component for a specific type of first aid, hosting the icon and header.
 */

import React from 'react'
import '../styles/FirstAidOption.css'

export default function FirstAidOption({ icon, header, icon_size, click }) {
  return (
    <div className='first-aid-option-root' onClick={click}>
        <div className='first-aid-option-inner'>
            <img className='first-aid-option-icon' src={icon} style={{width: `${icon_size}px`, height: `${icon_size}`}}></img>
            <h2 className='first-aid-option-header'>{header}</h2>
        </div>
    </div>
  )
}
