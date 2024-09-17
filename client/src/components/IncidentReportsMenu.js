/**
 * File: IncidentReportsMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu component showing all active reports
 */

import React from 'react'
import Menu from './Menu'
import '../styles/IncidentReportsMenu.css'
import { render_incident_report_items } from '../services/IncidentReportsService'

export default function IncidentReportsMenu( props ) {
  return (
    <Menu menu_header={"Incident Reports"} close={props.close_menu}>
        <section className='incidents-reports-menu-container'>
            <h2 className='incidents-reports-menu-subheading'>These reports are still active. Please remain vigilant.</h2>
          <section className='incidents-reports-menu-content'>
            {render_incident_report_items(props.reports, props.close_all_menus)}
          </section>
        </section>
    </Menu>
  )
}
