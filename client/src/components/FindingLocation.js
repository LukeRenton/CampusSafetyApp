/**
 * File: FindingLocation.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Small card to show that the app is looking for the user's location
 */

import React, { useEffect, useState } from 'react'
import '../styles/FindingLocation.css'
import animationData from '../lotties/finding_location.json'
import Lottie from 'lottie-react'


export default function FindingLocation() {
    
    const [show_more_info, set_show_more_info] = useState(false);
    
    const [show, set_show] = useState(false);

    /*
        Function: handle_show_more_info

        Description:
            Shows the text of the card

        Parameters: N/A

        Returns: N/A
    */
    const handle_show_more_info = () => {
        set_show_more_info(true);
        setTimeout(() => {
            set_show_more_info(false);
        },8000);
    }

    useEffect(() => {
        set_show(true);
        handle_show_more_info();
    },[])

    return (
    <div className={'finding-location-root '+(show ? 'finding-location-root-shown ' : '')+(!show_more_info ? 'finding-location-root-hide-text ' : '')} onClick={handle_show_more_info}>
        <div className='finding-location-lottie-container'>
            <Lottie
                className='finding-location-lottie'
                animationData={animationData}
                autoPlay={true}
                // size={`50px`}
                width={50}
                height={50}
            />
        </div>
        <h2 className={'finding-location-text '+(!show_more_info ? 'finding-location-text-hidden' : '')}>
            Finding your location
        </h2>
        
    </div>
  )
}
