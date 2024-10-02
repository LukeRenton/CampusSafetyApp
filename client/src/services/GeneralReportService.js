/**
 * File: GeneralReportService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for both incident- and alert reports
 */

import report_types from "../common/ReportTypes";

/*
    Function: fetch_all_reports

    Description:
        Fetches all reports (alert + incident)
    
    Parameters: N/A

    Returns:
        Array of reports
*/
export async function fetch_all_reports() {
  // Fetch goes here
  
  
  try {
    const incident_reports = []


    const res = await fetch('/incidents/all-incidents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then((report_list) => {
      

      report_list.forEach((report) => {

        if (["medical", "fire", "natural", "security", "weather"].includes(report.type)) {
          incident_reports.push({
            of_type: 'incident',
            id: report.id,
            type: report.type,
            description: report.description,
            active: report.active === 1,
            date: new Date(report.date.year,report.date.month,report.date.day,report.date.time.hour,report.date.time.minute,0,0),
            location: {
              lng: parseFloat(report.longitude),
              lat: parseFloat(report.latitude)
            },
            photo: report.photo
          })
        }
      })

    });

    const res2 = await fetch('/alerts/alerts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then((report_list) => {
      

      report_list.forEach((report) => {

        if (["medical", "fire", "natural", "security", "weather"].includes(report.type)) {
          incident_reports.push({
            of_type: 'alert',
            id: report.id,
            type: report.type,
            description: report_types[report.type].header + " Alert",
            active: report.active === 1,
            date: new Date(report.date.year,report.date.month,report.date.day,report.date.time.hour,report.date.time.minute,0,0),
            location: {
              lng: parseFloat(report.longitude),
              lat: parseFloat(report.latitude)
            },
            photo: null
          })
        }
      })

    });
    
    
    return incident_reports;
    // return res;

    // if (res.ok) {

      

    //   return res;
    // }
  } catch (err) {
    // Error handling!
    return {
      error: "Error fetching reports"
    }
  }
}


/*
Function: get_all_reports (SAMPLE)

Description:
  Fetches all reports from backend

Parameters: N/A

Returns:
  Array of notifications
*/
export function get_all_reports() {
    // ToDo: implement actual fetch for reports
    const sample_items = [
      {
        type: 'medical',
        description: 'Near the Wits Science Stadium',
        active: true,
        date: new Date(2024,8,13,10,0,0,0),
        location: {
          lng: 28.030204,
          lat: -26.190998
        }
      },
      {
        type: 'natural',
        description: 'near the Wits Science Stadium',
        active: true,
        date: new Date(2024,8,12,10,0,0,0),
        location: {
          lng: 28.026399,
          lat: -26.190466
        }
      },
      {
        type: 'fire',
        description: 'Near the FNB Building. Please evacuate the area immediately!',
        active: true,
        date: new Date(2024,7,8,8,47,0,0),
        location: {
          lng: 28.026826,
          lat: -26.188818
        }
      },
      {
        type: 'security',
        description: 'Near the FNB Building. Please evacuate the area immediately!',
        active: true,
        date: new Date(2024,7,2,12,30,0,0),
        location: {
          lng: 28.028993,
          lat: -26.190451
        }
      },
      {
        type: 'weather',
        description: 'Near the FNB Building. Please evacuate the area immediately!',
        active: true,
        date: new Date(2024,7,1,15,30,0,0),
        location: {
          lng: 28.030005, 
          lat: -26.187635
        }
      },
      {
        type: 'weather',
        description: 'Near the FNB Building. Please evacuate the area immediately!',
        active: false,
        date: new Date(2024,7,1,12,45,0,0),
        location: {
          lng: 28.031337, 
          lat: -26.187315
        }
      }
    ]
  
    return sample_items;
  
}