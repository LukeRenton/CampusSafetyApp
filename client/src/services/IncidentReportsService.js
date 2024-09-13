/**
 * File: IncidentReportsService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for incident reports.
 */
import { get_time, compare_dates, get_date_header } from '../services/DateTimeService'
import ReportItem from '../components/ReportItem';

/*
    Function: get_reports

    Description:
      Fetches reports from backend

    Parameters: N/A

    Returns:
      Array of reports
*/
function get_reports() {
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
    Function: render_incident_report_items

    Description:
      Creates mapping of HTML objects for notifications from an array

    Parameters:
      reports_array: array of notifications

    Returns:
      Mapping of HTML objects
*/
export function render_incident_report_items() {
  var reports_array = get_reports();

  // Handle notifications
  if (reports_array.length > 0) {
    // Add a final element to the bottom of the list: improves ui/ux by allowing further scroll distance
    reports_array.push({type: 'scroll-base'});

    // Return mapping of ReportItem objects
    return reports_array.map((report, i) => { 
      if (report.type === 'scroll-base') {
        return <div className='reports-menu-scroll-base'></div>
      } else {
        if (report.active) {
          return <ReportItem key={i} type={report.type} description={report.description} active={report.active} time={get_time(report.date)} show_time={false}></ReportItem>
        }
      }
    });

  } else {
    // Handle no notifications
    return <p className='reports-menu-no-reports'>No reports currently active.</p>
  }
}