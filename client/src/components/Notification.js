import React from 'react'
import '../styles/Notification.css'
import report_types from '../common/ReportTypes'

export default function Notification({ report, close_notification, go_to }) {
  return (
    <>
        <div className='notification-back' onClick={close_notification}></div>
        <div className='notification-root' onClick={go_to}>
            <div className='notification-container'>
                <h1 className='notification-header'>New Alert!</h1>
                <div className='notification-info'>
                    <div className='notificaiton-icon-container' style={{background: `${report_types[report.type].colour}`}}>
                        <img className='notificaiton-icon' src={report_types[report.type].icon}></img>
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
