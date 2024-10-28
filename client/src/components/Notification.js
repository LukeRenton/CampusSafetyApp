/**
 * File: Notification.js
 * 
 * Author: Mitchell and Anist
 * 
 * Description:
 *  Displays notification of report at top of screen
 */

import React, { useEffect, useState } from 'react'
import '../styles/Notification.css'
import report_types from '../common/ReportTypes'
import close_icon from '../icons/cross_black.svg'

export default function Notification({ report, close_notification, go_to }) {

  const [show_notification, set_show_notification] = useState(false);

  /*
    Function: handle_close_notification

    Description:
      Function to close the notification modal

    Parameters: N/A

    Returns: N/A
  */
  const handle_close_notification = () => {
    set_show_notification(false);
    setTimeout(() => {
        close_notification();
    }, 500);
  }

  useEffect(() => {
    setTimeout(() => {
        set_show_notification(true);
    }, 1)

    // setTimeout(() => {
    //   handle_close_notification();
    // }, 8000)
  },[])

  return (
    <>
        <div className={'notification-back '+(show_notification ? 'notification-back-shown' : '')} onClick={handle_close_notification}></div>
        <div className={'notification-root '+(show_notification ? 'notification-root-shown' : '')}>
            <div className='notification-container' onClick={go_to}>
                <section className='notification-header'>
                  <div className='notification-blank-div'></div>
                  <h1 className='notification-heading'>New Notification!</h1>
                  <img className='notification-close' alt="close" src={close_icon} onClick={handle_close_notification}></img>
                </section>
                <div className='notification-info'>
                    <div className='notificaiton-icon-container' style={{background: `${report_types[report.type].colour}`}}>
                        <img className='notificaiton-icon' alt="notification icon" src={report_types[report.type].icon}></img>
                    </div>
                    <div className='notification-extra-info'>
                        <h2 className='notification-type'>{report_types[report.type].header}</h2>
                        <h3 className='notification-click-me'>Click to view on map</h3>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
