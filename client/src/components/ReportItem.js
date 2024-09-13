/**
 * File: ReportItem.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component item of a report made. Shows its header, description, time and options based on if the report is active or not
 */
import React from 'react'
import '../styles/ReportItem.css'
import report_types from '../common/ReportTypes'

export default function ReportItem({ type, description, time, show_time, active }) {

  return (
    <article className='report-item-root'>
      <section className='report-item-contents'>
        <div className='report-item-icon-container' style={{background: `${report_types[type].colour}`}}>
          <img className='report-item-icon' src={report_types[type].icon}></img>
        </div>
        <section className='report-item-info'>
          <article className='report-item-header'>
            <h2 className='report-item-heading'>{report_types[type].header}</h2>
            {show_time ? <h4 className='report-item-time'>{time}</h4> : <></>}
          </article>
          <h3 className='report-item-description'>{description}</h3>
          <p className='report-item-view-on-map'>Click to view on map</p>
        </section>
      </section>
    </article>
  )
}
