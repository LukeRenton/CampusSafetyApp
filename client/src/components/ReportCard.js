/**
 * File: ReportCard.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Report button hosted inside Detailed Report menu
 */
import React from 'react'
import '../styles/ReportCard.css'

export default function ReportCard( { report_type } ) {
  return (
    <button className='report-card-root' style={{background: `${report_type.colour}`}}>
        <img className='report-card-icon' src={report_type.icon}></img>
        <h4 className='report-card-header'>{report_type.header}</h4>
    </button>
  )
}
