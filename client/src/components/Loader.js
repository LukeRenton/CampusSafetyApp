import React from 'react'
import Lottie, { LottiePlayer } from 'lottie-react'
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
