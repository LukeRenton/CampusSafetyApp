/**
 * File: PushNotificationService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for push notifications.
 */
import report_types from "../common/ReportTypes";

/*
    Function: create_new_report_from_notification

    Description:
        Creates a temporary report from a notification to satisfy the frontend
    
    Parameters:
        report: the report information

    Returns: Valid report object for frontend
*/
export default function create_new_report_from_notification(report) {
    return {
        of_type: report.of_type,
        id: report.id,
        type: report.type,
        description: report.description ? report.description : (report_types[report.type].header + " Alert"),
        active: report.active == 1,
        date: new Date(report.date.year,report.date.month,report.date.day,report.date.time.hour,report.date.time.minute,0,0),
        location: {
          lng: parseFloat(report.longitude),
          lat: parseFloat(report.latitude)
        },
        photo: report.photo
    }
}