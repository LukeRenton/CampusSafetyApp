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
import { move_map_to } from '../services/MapService'

export default function ReportItem({ type, description, time, show_time, active, close_all_menus_handler, location }) {

  /*
    Function: handle_go_to_map

    Description:
      Controls map movement to a location for the report item
    
    Parameters: N/A

    Returns: N/A
  */
  const handle_go_to_map = () => {
    move_map_to([location.lng, location.lat]);
    close_all_menus_handler();
  }

  return (
    <article className='report-item-root' onClick={ active ? handle_go_to_map : () => {}}>
      <section className='report-item-contents'>
        <div className='report-item-icon-container' style={{background: `${report_types[type].colour}`}}>
          <img className='report-item-icon' alt='report icon' src={report_types[type].icon}></img>
        </div>
        <section className='report-item-info'>
          <article className='report-item-header'>
            <h2 className='report-item-heading'>{report_types[type].header} Alert</h2>
            {show_time ? <h4 className='report-item-time'>{time}</h4> : <></>}
          </article>
          <h3 className='report-item-description'>{description}</h3>
          <p className='report-item-view-on-map'>{active ? "Click to view on map" : "Emergency cleared! No longer a concern"}</p>
        </section>
      </section>
    </article>
  )
}
