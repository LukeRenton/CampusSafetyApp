/**
 * File: EmergencyCall.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Emergency call button for ease-of-access emergency calls
 */
import React from 'react'
import '../styles/EmergencyCall.css'
import call from '../icons/call.svg'

export default function EmergencyCall() {
  return (
    <button className='emergency-call-root'>
        <h2 className='emergency-call-header'>Emergency Call</h2>
        <img className='emergency-call-icon' src={call}></img>
    </button>
  )
}
