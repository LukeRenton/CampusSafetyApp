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
import { get_all_reports } from './GeneralReportService';
  
/*
    Function: render_incident_report_items

    Description:
      Creates mapping of HTML objects for notifications from an array

    Parameters:
      reports_array: array of notifications

    Returns:
      Mapping of HTML objects
*/
export function render_incident_report_items(close_all_menus_handler) {
  var reports_array = get_all_reports();

  // Handle notifications
  if (reports_array.length > 0) {
    // Add a final element to the bottom of the list: improves ui/ux by allowing further scroll distance
    reports_array.push({type: 'scroll-base'});

    // Return mapping of ReportItem objects
    return reports_array.map((report, i) => { 
      if (report.type === 'scroll-base') {
        return <div key={i} className='reports-menu-scroll-base'></div>
      } else {
        if (report.active) {
          return <ReportItem key={i} location={report.location} close_all_menus_handler={close_all_menus_handler} type={report.type} description={report.description} active={report.active} time={get_time(report.date)} show_time={false}></ReportItem>
        }
      }
    });

  } else {
    // Handle no notifications
    return <p className='reports-menu-no-reports'>No reports currently active.</p>
  }
}