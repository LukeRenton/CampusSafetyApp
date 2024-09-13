/**
 * File: NotificationsService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for notifications.
 */
import { get_time, compare_dates, get_date_header } from '../services/DateTimeService'
import ReportItem from '../components/ReportItem';

/*
    Function: get_notifications

    Description:
      Fetches notifications from backend

    Parameters: N/A

    Returns:
      Array of notifications
*/
function get_notifications() {
  // ToDo: implement actual fetch for notifications
  const sample_items = [
    {
      type: 'medical',
      description: 'Near the Wits Science Stadium',
      active: true,
      date: new Date(2024,8,13,10,0,0,0)
    },
    {
      type: 'natural',
      description: 'near the Wits Science Stadium',
      active: true,
      date: new Date(2024,8,12,10,0,0,0)
    },
    {
      type: 'fire',
      description: 'Near the FNB Building. Please evacuate the area immediately!',
      active: true,
      date: new Date(2024,7,8,8,47,0,0)
    },
    {
      type: 'fire',
      description: 'Near the FNB Building. Please evacuate the area immediately!',
      active: true,
      date: new Date(2024,7,8,8,47,0,0)
    },
    {
      type: 'fire',
      description: 'Near the FNB Building. Please evacuate the area immediately!',
      active: true,
      date: new Date(2024,7,8,8,47,0,0)
    },
    {
      type: 'fire',
      description: 'Near the FNB Building. Please evacuate the area immediately!',
      active: true,
      date: new Date(2024,7,8,8,47,0,0)
    },
    {
      type: 'fire',
      description: 'Near the FNB Building. Please evacuate the area immediately!',
      active: true,
      date: new Date(2024,7,8,8,47,0,0)
    }
  ]

  return sample_items;
}

/*
    Function: render_notification_items

    Description:
      Creates mapping of HTML objects for notifications from an array

    Parameters:
      notification_array: array of notifications

    Returns:
      Mapping of HTML objects
*/
export function render_notification_items() {
  var notification_array = get_notifications();

  // Handle notifications
  if (notification_array.length > 0) {
    // Sort the list of notifications by date
    notification_array.sort((date1, date2) => compare_dates(date1.date, date2.date));
    
    // Augment the list of notifications by adding unique dates where needed
    // -- add the firt notification's date as the most recent date
    var prev_date = get_date_header(notification_array[0].date);
    notification_array.splice(0, 0, {type: 'new-date', date: prev_date})
    // -- continuously go through the list of notifications and add new dates if they are found
    var notification_number = 0;
    while (notification_number < notification_array.length) {
      const notification = notification_array[notification_number];

      if (!(notification.type === 'new-date')) {
        const new_date = get_date_header(notification.date);
        if (new_date !== prev_date) {
          notification_array.splice(notification_number, 0, {type: 'new-date', date: new_date})
          prev_date = new_date
        } else {
          notification_number++;
        }
      } else {
        notification_number++;
      }
    }

    // Add a final element to the bottom of the list: improves ui/ux by allowing further scroll distance
    notification_array.push({type: 'scroll-base'});

    // Return mapping of ReportItem objects and "new-date" cards
    return notification_array.map((notification, i) => { 
      if (notification.type === 'new-date') {
        return <div key={i} className='notifications-menu-new-date'>{notification.date}</div>
      } else if (notification.type === 'scroll-base') {
        return <div key={i} className='notifications-menu-scroll-base'></div>
      } else {
        return <ReportItem key={i} type={notification.type} description={notification.description} active={notification.active} time={get_time(notification.date)} show_time={true}></ReportItem>
      }
    });

  } else {
    // Handle no notifications
    return <p className='notifications-menu-no-notifications'>You have no notifications</p>
  }
}