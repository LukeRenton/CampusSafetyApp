/**
 * File: Navbar.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component to host all sub-components for- and to render- the navbar
 */
import React, { useState } from 'react'
import '../styles/Navbar.css'
import QuickReportButton from './QuickReportButton'
import exclamation from '../icons/exclamation.svg'
import report_types from '../common/ReportTypes'


export default function Navbar() {

  const [show_quickreports, set_show_quickreports] = useState(false);

  // Array of report types for easy rendering
  const report_types_data = [
    report_types['fire'],
    report_types['medical'],
    report_types['natural'],
    report_types['security'],
    report_types['weather'],
  ]

  /* 
    Function: render_quick_report_buttons

    Description:
      Simple UI function to render each report type as a QuickReportButton component in a list item

    Arguments: N/A

    Returns:
      Mapped component list of items with QuickReportButton components
  */
  const render_quick_report_buttons = () => {
    return report_types_data.map((report) => {
      return (
        <li key={report.type} className={'navbar-report-button-item '+( show_quickreports ? `shown-navbar-button-${report.type}` : '')}>
          <QuickReportButton type={report.type} colour={report.colour}>{report.icon}</QuickReportButton>
        </li>
      )
    })
  }

  /* 
    Function: handle_report_show

    Description:
      UI function to handle when user presses report button. Either shows quick report types or hides them.

    Arguments: N/A

    Returns: N/A
  */
  const handle_report_show = () => {
    set_show_quickreports(!show_quickreports);
  }

  return (
    <nav className='navbar-root'>
        <ul className='navbar-report-buttons'>
          {render_quick_report_buttons()}
        </ul>
        <button className={'navbar-report-button'} onClick={handle_report_show}>
          <section className='navbar-report-button-inner'>
              <img className='navbar-report-icon' src={exclamation}></img>
          </section>
        </button>
    </nav>
  )
}
