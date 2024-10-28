/**
 * File: EmailService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service to handle email requests for the ride scheduler
 */

/*
    Function: ride_scheduler_select_res

    Description:
      Calls to backend to store the selected residence for the ride scheduler
    
    Parameters:
        selectedResidence: the string containing the user's selected residence

    Returns:
        Promise of request
*/
export async function ride_scheduler_select_res(selectedResidence) {
    const res = await fetch('/email/store-residence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ residence: selectedResidence }), // Use selectedResidence here
      });
    return res;
      
}

/*
  Function: ride_scheduler_select_time

  Description:
    Calls to backend to store the selected time for the ride scheduler
  
  Parameters:
      time: the string containing the user's selected time

  Returns:
      Promise of request
*/
export async function ride_scheduler_select_time(time) {
    const res = await fetch('/email/store-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time }),
      });
    return res;
}