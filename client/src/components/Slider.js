/**
 * File: Slider.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Slider component to switch between different options. Will run "click_event" prop when the slider side is clicked and passes in "left" or "right" based on the new slider position.
 */

import React, { useState } from 'react'
import '../styles/Slider.css'

export default function Slider({ click_event, left_option, right_option }) {

    const [slider_position, set_slider_position] = useState('left');

    /*
        Function: handle_slider_click

        Description:
            Handles when slider is clicked

        Parameters:
            new_slider_position: position (left or right) to move to

        Returns: N/A
    */
    const handle_slider_click = (new_slider_position) => {
        set_slider_position(new_slider_position);
        click_event(new_slider_position);
    }

  return (
    <div className='slider-root'>
        <div className={'slider-selected '+ (slider_position === 'left' ? 'slider-selected-left' : 'slider-selected-right')}></div>
        <div className={'slider-option slider-option-left '+(slider_position === 'left' ? 'slider-option-selected' : 'slider-option-unselected')} onClick={() => handle_slider_click('left')}>
            {left_option}
        </div>
        <div className={'slider-option slider-option-right '+(slider_position === 'right' ? 'slider-option-selected' : 'slider-option-unselected')} onClick={() => handle_slider_click('right')}>
            {right_option}
        </div>
    </div>
  )
}
