/**
 * File: EmergencyInfoBox.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Box component to host a list of contact cards for a specific service
 */
import React from 'react'
import '../styles/EmergencyInfoBox.css'
import ContactCard from './ContactCard'

export default function EmergencyInfoBox({ header, content }) {

    /* 
      Function: render_contact_cards
  
      Description:
          Maps each contact card from the content array to a ContactCard object
  
      Arguments: N/A
  
      Returns:
          Mapped component list of ContactCard list items
    */
    const render_contact_cards = () => {
        return content.map((card, i) => {
            var show_bottom_line = true;
            if (i == content.length-1) {
                show_bottom_line = false;
            }
            return(
            <li key={i} className='emergency-info-box-item'>
                <ContactCard name={card.name} phone_num={card.phone_num} ></ContactCard>
                {show_bottom_line ? <div className='emergency-box-info-item-line'></div> : <></>}
            </li>
            )
        })
    }


  return (
    <div className='emergency-info-box-root'>
        <div className='emergency-info-box-inner'>
            <h2 className='emergency-info-box-header'>{header}</h2>
            <ul className='emergency-info-box-items'>
                {render_contact_cards()}
            </ul>
        </div>
    </div>
  )
}
