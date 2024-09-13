/**
 * File: FirstAidGuide.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu containing guide to first aid of specific type
 */
import React, { useState } from 'react'
import '../styles/FirstAidGuide.css'
import cross from '../icons/cross.svg'

export default function FirstAidGuide({ guide_name, icon, icon_size, close, steps }) {

    const [shown_step, set_shown_step] = useState(0);

    /* 
      Function: handle_next_step
  
      Description:
          Handles incrementing the step counter
  
      Arguments: N/A
  
      Returns: N/A
    */
    const handle_next_step = () => {
        const next_step = shown_step+1;
        if (next_step <= steps.length-1) {
            set_shown_step(next_step);
        }
    }

    /* 
      Function: handle_prev_step
  
      Description:
          Handles decrementing the step counter
  
      Arguments: N/A
  
      Returns: N/A
    */
    const handle_prev_step = () => {
        const prev_step = shown_step-1;
        if (prev_step >= 0) {
            set_shown_step(prev_step);
        }
    }

  return (
    <section className='first-aid-guide-root'>
        <section className='first-aid-guide-top'>
            <img className='first-aid-guide-icon' src={icon} style={{width: `${icon_size}px`, height: `${icon_size}px`}}></img>
            <h2 className='first-aid-guide-name'>{guide_name}</h2>
            <div className='first-aid-close' onClick={close}>
                <img className='first-aid-close-icon' src={cross}></img>
            </div>
        </section>
        <section className='first-aid-guide-content'>
            <section className='first-aid-guide-card-container'>
                <article className='first-aid-guide-card'>
                    <section className='first-aid-guide-inner'>
                        <section className='first-aid-guide-upper'>
                            <h3 className='first-aid-guide-card-header'>{steps[shown_step].header}</h3>
                            <p className='first-aid-guide-card-description'>{steps[shown_step].description}</p>
                        </section>
                        <p className='first-aid-guide-card-footer'>{`Step ${shown_step+1}`}</p>
                    </section>
                </article>
            </section>
            <section className='first-aid-guide-buttons'>
                <button className='first-aid-guide-button' onClick={handle_prev_step}>Previous Step</button>
                <button className='first-aid-guide-button' onClick={handle_next_step}>Next Step</button>
            </section>
        </section>
    </section>
  )
}