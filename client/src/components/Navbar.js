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
import arrow from '../icons/arrow_white.svg'


export default function Navbar({ report_types_data, open_detailed_report_menu, set_confirmation_menu }) {

  const [show_quickreports, set_show_quickreports] = useState(false);

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
        <li key={report.type} onClick={() => set_confirmation_menu(report)} className={'navbar-report-button-item '+( show_quickreports ? `shown-navbar-button-${report.type}` : '')}>
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
  const handle_show_detailed_report_menu = () => {
    set_show_quickreports(false);
    open_detailed_report_menu();
  }

  return (
    <>
      {show_quickreports ? <div className='navbar-back' onClick={() => set_show_quickreports(false)}></div> : <></>}
      <nav className='navbar-root'>
          <ul className='navbar-report-buttons'>
            {render_quick_report_buttons()}
          </ul>
          <button className={'navbar-report-button'} onClick={!show_quickreports ? () => set_show_quickreports(true) : () => handle_show_detailed_report_menu()}>
            <section className='navbar-report-button-inner'>
                {show_quickreports ? <img className='navbar-report-icon arrow-icon' src={arrow}></img> : <img className='navbar-report-icon' src={exclamation}></img>}
            </section>
          </button>
      </nav>
    </>
  )
}
