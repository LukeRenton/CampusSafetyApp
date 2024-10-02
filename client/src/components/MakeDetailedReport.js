/**
 * File: MakeDetailedReport.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component allowing user to add photo and description to a report
 */

import React, { useEffect, useState } from 'react'
import '../styles/MakeDetailedReport.css'
import camera from '../icons/camera.svg'
import { make_report } from '../services/IncidentReportsService';

export default function MakeDetailedReport( { set_error, set_uploading_report, report_type, close_menu, close_all_menus } ) {

    const [show_menu, set_show_menu] = useState(false);
    const [image_upload, set_image_upload] = useState(null);

    useEffect(() => {
        set_show_menu(true);
    },[])

    /*
        Function: handle_submit_detailed_report

        Description:
            Submits a detailed report to the backend

        Parameters: N/A

        Returns: N/A
    */
    const handle_submit_detailed_report = async () => {
        const description = document.getElementById('report-description-input').value;
        
        set_uploading_report(report_type.type);
        close_all_menus();
        make_report(report_type.type, image_upload, description).then((result) => {
            if (result.error) {
                set_error({
                    message: "Error sending incident report"
                });
            }
            set_uploading_report(null);
        }).catch(err => {
            set_error({
                message: "Error sending incident report"
            });
            set_uploading_report(null);
        })
    }

  return (
    <>
        <div className={'make-detailed-report-root '+(show_menu ? 'make-detailed-report-root-shown' : '')}>
            <div className='make-detailed-report-container'>
                <div className='make-detailed-report-header' style={{background: `${report_type.colour}`}}>
                    <img className='make-detailed-report-icon' src={report_type.icon} alt="report icon"></img>
                    <h2 className='make-detailed-report-heading'>{report_type.header}</h2>
                    <div className='make-detailed-report-empty-div'></div>
                </div>
                <div className='make-detailed-report'>
                    <h3 className='make-detailed-report-subheading'>Make a detailed report</h3>

                    <div className='make-detailed-report-input-group'>
                        <div className='make-detailed-report-picture'>
                            <h4 className='make-detailed-report-picture-heading'>Upload a picture (Click to upload)</h4>
                            
                            {/* <div className='make-detailed-report-upload-picture-default'>
                                    
                                    <img className='make-detailed-report-upload-picture-camera' src={camera}></img>
                                    <p className='make-detailed-report-upload-picture-default-text'>Click to upload a picture</p>
                                </div>     */}
                            <div className='make-detailed-report-upload-picture' style={{border: `3px dashed ${report_type.colour}`, backgroundImage: `${image_upload ? `url(${URL.createObjectURL(image_upload)})` : `url(${camera})`}`, backgroundSize: `${image_upload ? `100%` : `25%`}`}}>
                                <input
                                    className='make-detailed-report-upload-picture-input'
                                    label="Image"
                                    placeholder="Choose image"
                                    accept="image/png,image/jpeg"
                                    type="file"
                                    onChange={(e) => {
                                        set_image_upload(e.target.files[0]);
                                    }}
                                ></input>
                            </div>
                        </div>
                        <div className='make-detailed-report-description'>
                            <h4 className='make-detailed-report-description-heading'>Add a description</h4>
                            <textarea id="report-description-input" className='make-detailed-report-description-input' placeholder='Add report description here...' ></textarea>
                        </div>
                    </div>
                </div>
                <div className='make-detailed-report-buttons'>
                    <button className='make-detailed-report-button-submit' style={{background: `${report_type.colour}`}} onClick={handle_submit_detailed_report}>Submit Report</button>
                    <button className='make-detailed-report-button-cancel' onClick={close_menu}>Cancel</button>
                </div>
            </div>
        </div>
    </>
  )
}
