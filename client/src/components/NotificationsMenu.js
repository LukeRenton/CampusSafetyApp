/**
 * File: NotificationsMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu component showing notifications of reports
 */
import React from 'react'
import '../styles/NotificationsMenu.css'
import Menu from './Menu'
import ReportItem from './ReportItem'
import { render_notification_items } from '../services/NotificationsService'

export default function NotificationsMenu( props ) {

  /*
    Function: render_notifications

    Description:
      Renders the notification list

    Parameters: N/A

    Returns: N/A
  */
  const render_notifications = () => {
    const result = render_notification_items(props.reports, props.close_all_menus); 
    
    if (result.error) {
      // Handle error
      props.set_error({
        error: result.error
      })
      return <></>
    }

    return result;
  }

  return (
    <Menu menu_header={"Notifications"} close={props.close_menu}>
      <section className='notifications-menu-content'>
        {render_notifications()}
        {/* <ReportItem type={'medical'} description={'Near the wits science stadium'} active={true} time={'10:00'}></ReportItem> */}
      </section>
    </Menu>
  )
}
