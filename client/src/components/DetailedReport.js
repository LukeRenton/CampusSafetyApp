/**
 * File: DetailedReport.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Detailed Report menu hosting components for user to better understand reporting
 */

import React, { useEffect, useState } from 'react'
import '../styles/DetailedReport.css'
import cross from '../icons/cross_black.svg'
import ReportCard from './ReportCard'
import ReportConfirmation from './ReportConfirmation';

export default function DetailedReport( { report_types_data, close_menu, report, set_confirmation_menu } ) {

    const [show_menu, set_show_menu] = useState(false);

    useEffect(() => {
        set_show_menu(true);
    },[])

    /*
      Function: handle_close_menu
  
      Description:
        Closes menu with animation timer
  
      Parameters: N/A
  
      Returns: N/A
  */
    const handle_close_menu = () => {
        set_show_menu(false);
        setTimeout(() => {
            close_menu();
        },400)
    }

  return (
    <>
        <div className={'detailed-report-back '+(show_menu ? 'detailed-report-back-shown' : 'detailed-report-back-hidden')} onClick={handle_close_menu}></div>
        <section className={'detailed-report-root '+(show_menu ? 'detailed-report-shown' : '')}>
           <section className='detailed-report-content'>
              <section className='detailed-report-top'>
                  <div className='detailed-report-blank-div'></div>
                  <h2 className='detailed-report-header'>Report</h2>
                  <img className='detailed-report-close' src={cross} onClick={handle_close_menu}></img>
              </section>
              <h3 className='detailed-report-sub-header'>What type of incident are you reporting?</h3>
              <ul className='detailed-report-types'>
                  {report_types_data.map((report_type) => {
                    return <li className='detailed-report-type-item' onClick={() => set_confirmation_menu(report_type)}><ReportCard report_type={report_type}></ReportCard></li>
                  })}
                  <div className='detailed-report-scroll-bottom'></div>
              </ul>
            </section>
        </section>
        {/* <ReportConfirmation report_type={report_types_data[0]} close_menu={handle_close_menu}></ReportConfirmation> */}
    </>
  )
}
