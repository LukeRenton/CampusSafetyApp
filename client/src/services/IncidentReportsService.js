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
import { get_user_coords } from './MapService';
  
/*
    Function: render_incident_report_items

    Description:
      Creates mapping of HTML objects for notifications from an array

    Parameters:
      reports_array: array of notifications

    Returns:
      Mapping of HTML objects
*/
export function render_incident_report_items(reports_array_in, close_all_menus_handler) {
  // var reports_array = get_all_reports();
  var reports_array = [...reports_array_in];

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


export async function make_report(type, image, description) {  

  try {    
    

    const position = get_user_coords();

    console.log(image);

    var formdata = new FormData();
    formdata.append("description", description);
    formdata.append("latitude", position.lat);
    formdata.append("longitude", position.lng);
    formdata.append("type", type);
    if (image) {
      formdata.append("photo", image, image.name);
    } else {
      formdata.append("photo", null);
    }


    console.log(formdata);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    console.log('making report');
    
    const res = await fetch('/incidents/report-incidents', requestOptions)
    .then((res) => res.json())
    .catch(err => {return {error: err}});
    
    console.log("RESULT HERE");
    console.log(res);

    if (!res.error) {
      return {
        success: "success"
      }
    } else {
      return {
        error: "Error sending alert"
      }
    }

    return res;

    
  } catch (err) {
    // Error handling!
    console.log(err);
    return {
      error: "Error sending incident report"
    }
  }
}