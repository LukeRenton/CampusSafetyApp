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

export default function Spinner({size}) {
  return (
    <div className='spinner-root' style={{width: `${size}px`, height: `${size}px`}}>
        <Lottie
            animationData={animationData}
            autoPlay={true}
        />
    </div>
  )
}
