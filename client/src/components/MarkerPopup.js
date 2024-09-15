/**
 * File: MarkerPopup.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component to display popup for a marker
 */

import React from 'react'
import '../styles/MarkerPopup.css'
import report_types from '../common/ReportTypes'

export default function MarkerPopup({ report, close }) {
  return (
    <section className='marker-popup-root' onClick={close}>
            <article className='marker-popup-content'>
                <section className='marker-popup-header' style={{background: `${report_types[report.type].colour}`}}>
                    <img className='marker-popup-icon' src={report_types[report.type].icon}></img>
                    <h2 className='marker-popup-heading'>{report_types[report.type].header}</h2>
                    <div className='marker-popup-empty-div'></div>
                </section>
                <section className='marker-popup-main-info'>
                    <img className='marker-popup-main-icon' src={report_types[report.type].marker}></img>
                    <h1 className='marker-popup-main-header'>Marker Information</h1>
                </section>
                <p className='marker-popup-description'>{report.description}</p>
            </article>
    </section>
  )
}
