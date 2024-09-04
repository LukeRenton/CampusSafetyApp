/**
 * File: Menu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Main page component to host items to be displayed on the main page (home page) of the app
 */
import React from 'react'
import Map from '../components/Map';
import '../styles/Main.css'
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';

export default function Main() {
  return (
    <div className='main-root'>
        <Navbar />
        <Topbar />
        <Map />
    </div>
  )
}
