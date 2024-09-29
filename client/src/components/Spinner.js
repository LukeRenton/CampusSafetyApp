/**
 * File: Spinner.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Simple spinner object for loading animations
 */

import React from 'react'
import Lottie, { LottiePlayer } from 'lottie-react'
import '../styles/Spinner.css'
import animationData from '../lotties/spinner.json'
import report_types from '../common/ReportTypes'

export default function Spinner({size, report_type}) {
  return (
    <div className='spinner-root' style={{width: `${size}px`, height: `${size}px`}}>
        <Lottie
            animationData={report_types[report_type].spinner}
            autoPlay={true}
        />
    </div>
  )
}
