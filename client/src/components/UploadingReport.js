import React, { useEffect, useState } from 'react'
import '../styles/UploadingReport.css'
import report_types from '../common/ReportTypes'
import Loader from './Loader'

export default function UploadingReport( { report_type } ) {

  const [shown, set_shown] = useState(false);

  useEffect(() => {
    set_shown(true);
  },[])

  return (
    <div className={'uploading-report-root '+(shown ? 'uploading-report-root-shown' : '')} style={{background: `${report_types[report_type].colour}`}}>
      <img className='uploading-report-icon' src={report_types[report_type].icon}></img>
      <h3 className='uploading-report-text'>Uploading your report</h3>
      <Loader size={30}></Loader>
    </div>
  )
}
