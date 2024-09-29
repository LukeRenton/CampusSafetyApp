import report_types from "../common/ReportTypes";

export default function create_new_alert_from_notification(report) {
    return {
        type: report.type,
        description: report.description ? report.description : (report_types[report.type].header + " Alert"),
        active: report.active === 1,
        date: new Date(report.date.year,report.date.month,report.date.day,report.date.time.hour,report.date.time.minute,0,0),
        location: {
          lng: parseFloat(report.longitude),
          lat: parseFloat(report.latitude)
        },
        photo: report.photo
    }
}