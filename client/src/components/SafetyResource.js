import React from 'react'
import '../styles/SafetyResource.css'
import report_types from '../common/ReportTypes'

export default function SafetyResource( { resource } ) {
  return (
    <div className='safety-resource-root'>
        <div className='safety-resource-header'  style={{background: `${report_types[resource.type].colour}`}}>
            <img className='safety-resource-icon' src={report_types[resource.type].icon}></img>
            <h2 className='safety-resource-heading'>
                {resource.title}
            </h2>
        </div>
        <div className='safety-resource-base' >
            <p className='safety-resource-description'>
            {resource.description}
            </p>
            <div className='safety-resource-button-container'>
                <a className='safety-resource-button' style={{background: `${report_types[resource.type].colour}`}} href={resource.link} target="_blank">Open Link</a>
            </div>
        </div>
    </div>
  )
}
