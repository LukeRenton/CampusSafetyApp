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
import Spinner from './Spinner'
import status_icon from '../icons/tilted_bell.svg'
import { update_alert_status } from '../services/AlertReportsService'
import Loader from './Loader'
import { update_incident_status } from '../services/IncidentReportsService'

export default function MarkerPopup({ set_error, report, close }) {

  const [loading_change, set_loading_change] = useState(false);
  const [loading_image, set_loading_image] = useState(true);
  const [status, set_status] = useState(report.active === true ? "Active" : "Inactive");

  /*
    Function: submit_changes

    Description:
      Submits changes to "Active" status

    Paramters:
      e: event
    
      Returns: N/A
  */
  const submit_changes = async (e) => {
    if (report.of_type === 'alert') {
      set_loading_change(true);
      await update_alert_status(report.id, (status === "Active")).then((res) => {
        if (res.error) {
          set_error({
            message: "Status change error: Could not update status"
          })
          if (status === "Active") {
            set_status("Inactive");
          } else {
            set_status("Active");
          }
          set_loading_change(false);
        } else {
          report.active = (status === "Active");
          set_loading_change(false);
        }
      }).catch(err => {
        // HANDLE ERROR
        set_error({
          message: "Status change error: Could not update status"
        })
        if (status === "Active") {
          set_status("Inactive");
        } else {
          set_status("Active");
        }
        set_loading_change(false);
      })
    } else if (report.of_type === 'incident') {
      set_loading_change(true);
      await update_incident_status(report.id, (status === "Active")).then((res) => {
        report.active = (status === "Active");
        set_loading_change(false);
      }).catch(err => {
        // HANDLE ERROR
        set_error({
          message: "Status change error: Could not update status"
        })
        if (status === "Active") {
          set_status("Inactive");
        } else {
          set_status("Active");
        }
        set_loading_change(false);
      })
    }
  }

  /*
    Function: change_status

    Description:
      Changes the status from input

    Parameters:
      e: event sender

    Returns: N/A
  */
  const change_status = (e) => {
    // e.stopPropagation();
    set_status(e.target.value);
  }

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
    <>
    <div className='marker-popup-back' onClick={close}></div>
    <section className='marker-popup-root' onClick={close}>
            <article className='marker-popup-content' onClick={(e) => e.stopPropagation()} >
                <section className='marker-popup-header' style={{background: `${report_types[report.type].colour}`}}>
                    <img className='marker-popup-icon' src={report_types[report.type].icon}></img>
                    <h2 className='marker-popup-heading'>{report_types[report.type].header}</h2>
                    <div className='marker-popup-empty-div'></div>
                </section>
                <section className='marker-popup-main-info'>
                    <img className='marker-popup-main-icon' alt="marker icon" src={report_types[report.type].marker}></img>
                    <h1 className='marker-popup-main-header'>Marker Information</h1>
                </section>
                <p className='marker-popup-description'>{report.description}</p>
                {report.photo ? 
                <section className='marker-popup-photo'>
                  <section className='marker-popup-photo-header'>
                    <div className='marker-popup-photo-icon-container'>
                      <img className='marker-popup-photo-icon' alt="Upload Photo" src={camera_icon}></img>
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
                <section className='marker-popup-status'>
                  <section className='marker-popup-status-header'>
                    <div className='marker-popup-status-icon-container'>
                        <img className='marker-popup-status-icon' alt="status icon" src={status_icon}></img>
                    </div>
                    <h1 className='marker-popup-main-header'>Status</h1>
                  </section>
                  <section className='marker-popup-status-selector-container'>
                    <select className="marker-popup-status-selector" onChange={change_status} value={status}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {report.active === (status === "Active") ? <></> : <button onClick={loading_change ? () => {} : submit_changes} className='marker-popup-status-change' style={{background: `${report_types[report.type].colour}`}}>
                      {loading_change ? <Loader size={30}></Loader> : 'Change Status'}
                    </button>}
                  </section>
                </section>
            </article>
    </section>
    </>
  )
}
