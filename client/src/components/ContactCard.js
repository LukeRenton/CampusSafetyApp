/**
 * File: ContactCard.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Contact Card component to host a contact name, phone number and the call button
 */

import React from 'react'
import '../styles/ContactCard.css'
import call from '../icons/call_2.svg'    

export default function ContactCard({ name, phone_num }) {
  return (
    <article className='contact-card-root'>
        <section className='contact-card-content'>
            <section className='contact-card-info'>
                <h2 className='contact-card-name'>
                    {name}
                </h2>
                <h3 className='contact-card-phone-num'>
                    {phone_num}
                </h3>
            </section>
            <button className='contact-card-call-button'>
                <p className='contact-card-call-button-text'>Call</p>
                <img className='contact-card-call-button-icon' src={call}></img>
            </button>
        </section>
    </article>
  )
}
