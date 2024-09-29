/**
 * File: ReportConfirmation.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Report Confirmation custom modal
 */
import React, { useEffect, useState } from 'react'
import '../styles/ReportConfirmation.css'
import ReportCard from './ReportCard'
import AutoCountdown from './AutoCountdown'
import { make_alert_report } from '../services/AlertReportsService'

export default function ReportConfirmation({ report_type,  close_all_menus, close_menu }) {

    /*
      Function: handle_countdown_finish
  
      Description:
        Handles autosubmission of report
  
      Parameters: N/A
  
      Returns: N/A
    */
    const handle_countdown_finish = () => {
        handle_yes();
    }

    /*
      Function: handle_yes
  
      Description:
        Handles confirm of report
  
      Parameters: N/A
  
      Returns: N/A
    */
    const handle_yes = () => {
        // ToDo: handle report submission
        make_alert_report(report_type.type)
        close_all_menus();
    }

    /*
      Function: handle_no
  
      Description:
        Handle cancellation of report
  
      Parameters: N/A
  
      Returns: N/A
    */
      const handle_no = () => {
        close_menu();
      }

  return (
    <section className='report-confirmation-root'>
        <section className='report-confirmation-content'>
            <ReportCard report_type={report_type}></ReportCard>
            <article className='report-confirmation-causes'>
                <p className='report-confirmation-header'>This report will cause:</p>
                <ul className='report-confirmation-list'>
                    {report_type.report_causes.map((causes_effect) => {
                        return <li className='report-confirmation-causes-item'>{causes_effect}</li>
                    })}
                </ul>
            </article>
            <section className='report-confirmation-options'>
                <h5 className='report-confirmation-options-text'>Are you sure you want to make this report?</h5>
                <section className='report-confirmation-buttons'>
                    <button className='report-confirmation-button-no' onClick={handle_no}>
                        <p className='report-confirmation-button-text'>No</p>
                    </button>
                    <button className='report-confirmation-button-yes' onClick={handle_yes} style={{background: `${report_type.colour}`}}>
                        <p className='report-confirmation-button-text' >Yes</p>
                    </button>
                </section>
                <section className='report-confirmation-auto-text'>Automatically confirming in <AutoCountdown on_finish_event={handle_countdown_finish}/> seconds</section>
            </section>
        </section>
    </section>
  )
}
