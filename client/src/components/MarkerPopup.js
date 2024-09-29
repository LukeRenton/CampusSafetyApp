/**
 * File: MarkerPopup.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component to display popup for a marker
 */

import React, { useEffect, useState } from 'react'
import '../styles/MarkerPopup.css'
import report_types from '../common/ReportTypes'
import camera_icon from '../icons/camera.svg'
import sample_photo from '../media/sample_report_photo.png'
import Spinner from './Spinner'

export default function MarkerPopup({ report, close }) {
  const [loading_image, set_loading_image] = useState(true);

  // Fetch image dynamically
  useEffect(() => {
    if (report.photo) {
        const img = new Image();
        img.src = report.photo;

        img.onload = () => {
          set_loading_image(false);
        }
    }
  },[report.photo])

  return (
    <section className='marker-popup-root' onClick={close}>
            <article className='marker-popup-content'>
                <section className='marker-popup-header' style={{background: `${report_types[report.type].colour}`}}>
                    <img className='marker-popup-icon' src={report_types[report.type].icon}></img>
                    <h2 className='marker-popup-heading'>{report_types[report.type].header}</h2>
                    <div className='marker-popup-empty-div'></div>
                </section>
                <section className='marker-popup-main-info'>
                    <img className='marker-popup-main-icon' src={report_types[report.type].marker}></img>
                    <h1 className='marker-popup-main-header'>Marker Information</h1>
                </section>
                <p className='marker-popup-description'>{report.description}</p>
                {report.photo ? 
                <section className='marker-popup-photo'>
                  <section className='marker-popup-photo-header'>
                    <div className='marker-popup-photo-icon-container'>
                      <img className='marker-popup-photo-icon' src={camera_icon}></img>
                    </div>
                    <h1 className='marker-popup-main-header'>Photo</h1>
                  </section>
                  {report.photo ?
                  (<div className='markup-popup-photo-image'  style={{backgroundImage: `${loading_image ? `` : `url(${report.photo})`}`}}>
                    {loading_image === true ? <Spinner size={40} report_type={report.type}></Spinner> : <></>}
                  </div>)
                  :
                  <></>
                  }
                </section>
                :
                <></>
                }
            </article>
    </section>
  )
}
