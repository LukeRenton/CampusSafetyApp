/**
 * File: Loader.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Simple loading animation component
 */

import React from 'react'
import Lottie from 'lottie-react'
import '../styles/Loader.css'
import animationData from '../lotties/loader_white.json'

export default function Loader( { size } ) {
  return (
    <div className='loader-root' style={{width: `${size}px`, height: `${size}px`}}>
        <Lottie
            animationData={animationData}
            autoPlay={true}
        />
    </div>
  )
}
