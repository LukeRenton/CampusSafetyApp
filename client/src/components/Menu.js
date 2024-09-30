/**
 * File: Menu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu component to house different types of menus. Will display the menu header and a close button.
 */
import React, { useEffect, useState } from 'react'
import '../styles/Menu.css'
import arrow from '../icons/arrow.svg'

export default function Menu({ close, menu_header, children }) {

    // Hook to allow menu to animate in
    const [show_menu, set_show_menu] = useState(false);

    useEffect(() => {
        set_show_menu(true);
    },[])

    /*
        Function: handle_close_menu

        Description:
          Handles menu close animation smoothly

        Parameters: N/A

        Returns: N/A
    */
    const handle_close_menu = () => {
        set_show_menu(false);
        setTimeout(() => {
            close();
        },500)
    }

    return (
    <>
        <div className={'menu-background '+(show_menu ? 'menu-background-shown' : 'menu-background-hidden')} onClick={() => handle_close_menu()}></div>
        <section className={'menu-root ' + (show_menu ? 'menu-root-shown' : '')}>
            <header className='menu-top-header'>
                <nav className='menu-top-nav'>
                    <img className='menu-back' src={arrow} onClick={() => {handle_close_menu()}}></img>
                </nav>
                <h1 className='menu-top-heading'>{menu_header}</h1>
                <div className='menu-empty-div'></div>
            </header>
            <section className='menu-content'>
                {children}
            </section>


        </section>
    </>
  )
}
