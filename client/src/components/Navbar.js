/**
 * File: Navbar.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component to host all sub-components for- and to render- the navbar
 */
import React from 'react'
import '../styles/Navbar.css'
import Report from './Report'

export default function Navbar() {
  return (
    <div className='navbar-root'>
        <Report />
    </div>
  )
}
