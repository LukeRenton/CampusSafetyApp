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

  /*
    Function: render_incidents

    Description:
      Renders the incidents for the report menu

    Paramters: N/A

    Returns: N/A
  */

  const render_incidents = () => {
    const result = render_incident_report_items(props.reports, props.close_all_menus)
    if (result.error) {
      // Handle error
      props.set_error({
        message: "Error getting incident reports"
      });
      return <></>
    }
    return result;
  }
  return (
    <Menu menu_header={"Incident Reports"} close={props.close_menu}>
        <section className='incidents-reports-menu-container'>
            <h2 className='incidents-reports-menu-subheading'>These reports are still active. Please remain vigilant.</h2>
          <section className='incidents-reports-menu-content'>
            {render_incidents()}
          </section>
        </section>
    </Menu>
  )
}
