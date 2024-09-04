/**
 * File: Report.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Main button to report an incident easily
 *  Displays icons that are displayed when holding in button for ease-of-access reporting
 */
import React from 'react'
import '../styles/Report.css'
import exclamation from '../icons/exclamation.svg'

export default function Report() {
  return (
    <div className='report-root'>
        <div className='report-button'>
            <img className='report-icon' src={exclamation}></img>
        </div>
    </div>
  )
}
