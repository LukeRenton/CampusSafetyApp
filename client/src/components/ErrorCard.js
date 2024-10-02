/**
 * File: ErrorCard.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Card to display errors to user
 */


import React, { useEffect, useState } from 'react'
import '../styles/ErrorCard.css'
import error_icon from '../icons/error.svg'

export default function ErrorCard( { set_error, error } ) {

    const [show, set_show] = useState(false);

    /*
        Function: handle_close

        Description:
            Closes the error card

        Parameters: N/A

        Returns: N/A
    */
    const handle_close = () => {
        set_show(false);
        setTimeout(() => {
            set_error(false)
        }, 400)
    }

    useEffect(() => {
        set_show(true);
        setTimeout(() => {
            handle_close();
        }, 8000);
    },[])

  return (
    <div className={'error-card-root '+(show ? 'error-card-root-shown' : '')}>
        <div className={'error-card-content '+(show ? 'error-card-content-shown' : '')}>
            <div className='error-card-icon-container'>
                <img className='error-card-icon' src={error_icon} alt="error icon"></img>
            </div>
            <div className='error-card-text-container'>
                <h2 className='error-card-heading'>An error has occurred: </h2>
                <h3 className='error-card-message'>{error.message}</h3>
            </div>
        </div>
    </div>
  )
}
