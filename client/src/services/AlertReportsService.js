/**
 * File: AlertReportsService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for alert reports.
 */

import { get_user_coords } from "./MapService";

/*
    Function: make_alert_report

    Description:
        Creates an alert of a specific type and uploads to backend
    
    Parameters:
        type: type of alert to be reported

    Returns:
        either success or error object
*/
export async function make_alert_report(type) {

    try {

      const position = get_user_coords();
      
      const res = await fetch('/alerts/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: type,
            active: 1,
            latitude: position.lat,
            longitude: position.lng
        })
  
      }).then((res) => res.json())
      .catch(err => {
        return {
          error: "Error sending alert"
        }
      })


      if (!res.error) {
        return {
          success: "success"
        }
      } else {
        return {
          error: "Error sending alert"
        }
      }


      
    } catch (err) {
      // Error handling!
      return {
        error: "Error sending alert"
      }
    }
  }

/*
  Function: update_alert_status

  Description:
      Updates alert status
  
  Parameters:
      id: id of alert to be updated
      status: status to change to

  Returns:
      either success or error object
*/
export async function update_alert_status(id, status) {

try {
  const res = await fetch(`/alerts/alerts/${id}/active`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        active: status  
    })

  }).then((res) => res.json())
  .catch(err => {
    return {
      error: "Error updating alert status"
    }
  })


  if (!res.error) {
    return {
      success: "success"
    }
  } else {
    return {
      error: "Error updating alert status"
    }
  }


  
} catch (err) {
  // Error handling!
  return {
    error: "Error updating alert status"
  }
}
}