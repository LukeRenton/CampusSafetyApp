import React from 'react'
import '../styles/Notification.css'

export default function Notification({ report }) {
  return (
    <>
        <div className='notification-back'></div>
        <div className='notification-root'>
            <div className='notification-container'>
                <h1 className='notification-header'>New Alert!</h1>
                <div className='notification-info'>
                    <div className='notificaiton-icon-container'>

                    </div>
                    <div className='notification-extra-info'>
                        <h2 className='notification-type'>Health Emergency</h2>
                        <h3 className='notification-click-me'>Click to view on map</h3>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
