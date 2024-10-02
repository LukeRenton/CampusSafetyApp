/**
 * File: Navbar.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component to host all sub-components for- and to render- the navbar
 */
import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import QuickReportButton from './QuickReportButton'
// import exclamation from '../icons/exclamation.svg'
import sos from '../icons/sos.svg'
import arrow from '../icons/arrow_white.svg'
import Loader from './Loader'


export default function Navbar({ uploading_report, location_services_enabled, show_quickreports, set_show_quickreports, report_types_data, open_detailed_report_menu, set_confirmation_menu }) {

  const [sos_img, set_sos_img] = useState(null);
  const [arrow_img, set_arrow_img] = useState(null);

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


  useEffect(() => {
    const load_sos_img = new Image();
    load_sos_img.src = sos;
    const load_arrow = new Image();
    load_arrow.src = arrow;


    load_sos_img.onload = () => {
      set_sos_img(load_sos_img);
    }

    load_arrow.onload = () => {
      set_arrow_img(load_arrow);
    }


  },[])

  return (
    <>
      {show_quickreports ? <div className='navbar-back' onClick={() => set_show_quickreports(false)}></div> : <></>}
      <nav className='navbar-root'>
          {
          location_services_enabled && !uploading_report ?
          <ul className='navbar-report-buttons'>
            {render_quick_report_buttons()}
          </ul>
          :
          <></>
          }
          <button className={'navbar-report-button '+(location_services_enabled && !uploading_report ? 'navbar-report-button-shown' : 'navbar-report-button-hidden')} onClick={!show_quickreports ? () => set_show_quickreports(true) : () => handle_show_detailed_report_menu()}>
            <section className='navbar-report-button-inner'>
                {show_quickreports ?
                (
                  arrow_img ? <img className='navbar-report-icon arrow-icon' alt='Open detailed menu' src={arrow_img.src}></img> : <Loader size={50}></Loader>
                )
                // <h2>More</h2>
                :
                // <h2>SOS</h2>
                (uploading_report ? <Loader size={40}></Loader> : (sos_img ? <img className='navbar-report-icon' alt='Report Alert' src={sos_img.src} style={{marginTop: `-7px`}}></img> : <Loader size={50}></Loader>))
                }
            </section>
          </button>
          {
          location_services_enabled ?
          <section className={'navbar-detailed-menu-indicator '+(show_quickreports ? 'navbar-detailed-menu-indicator-shown' : '')}>
                <h3 className='navbar-detailed-menu-indicator-text'>click again to bring up detailed menu</h3>
          </section>
          :
          <section className={'navbar-disabled-location '+(!location_services_enabled ? 'navbar-disabled-location-shown' : '')}>
                <h3 className='navbar-disabled-location-text'>enable your location and refresh to make reports</h3>
          </section>
          }
      </nav>
    </>
  )
}
