import React, { useState } from 'react'
import '../styles/MakeDetailedReport.css'
import camera from '../icons/camera.svg'
import { make_report } from '../services/IncidentReportsService';
import { fetch_all_reports } from '../services/GeneralReportService';

export default function MakeDetailedReport( { report_type, close_menu } ) {

    const [image_upload, set_image_upload] = useState(null);

    const handle_submit_detailed_report = async () => {
        // Handle submit report
        const description = document.getElementById('report-description-input').value;
        // console.log(URL.createObjectURL(image_upload));

        console.log("making report");
        console.log(image_upload);
        const new_image = image_upload;
        make_report(report_type.type, new_image, description);

    }

  return (
    <>
        <div className='make-detailed-report-root'>
            <div className='make-detailed-report-container'>
                <div className='make-detailed-report-header' style={{background: `${report_type.colour}`}}>
                    <img className='make-detailed-report-icon' src={report_type.icon}></img>
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
