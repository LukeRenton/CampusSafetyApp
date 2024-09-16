/**
 * File: QuickReportButton.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Reusable component for user to make quick report of incident
 */
import React from 'react'
import '../styles/QuickReportButton.css'

export default function QuickReportButton({ children, colour }) {
  return (
    <button className='quick-report-button-root' style={{background: `${colour}`}}>
        <img className='quick-report-button-icon' src={children} />
    </button>
  )
}
