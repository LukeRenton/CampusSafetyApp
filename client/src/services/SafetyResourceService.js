/**
 * File: SafetyResourceServices.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for safety resources.
 */

/*
    Function: fetch_safety_resources

    Description:
        Fetches safety resources from backend
    
    Parameters: N/A

    Returns:
      Array of safety resources as objects
*/
export async function fetch_safety_resources() {


    const res = await fetch('/resources/safety-resources', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
      .then((resources) => {
        return resources;
      })
      .catch(err => {
        return {
            error: "Error fetching safety resources"
        }
      })
    
    if (res.error) {
        return {
            error: "Error fetching safety resources"
        }
    }

    return res;
}