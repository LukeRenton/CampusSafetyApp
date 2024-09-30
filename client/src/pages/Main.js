/**
 * File: Menu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Main page component to host items to be displayed on the main page (home page) of the app
 */
import React, { useEffect, useState, useContext } from 'react'
import Map from '../components/Map';
import '../styles/Main.css'
import { get_profile, get_blank_profile } from '../services/ProfileService'
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import SideMenu from '../components/SideMenu';
import NotificationsMenu from '../components/NotificationsMenu';
import IncidentReportsMenu from '../components/IncidentReportsMenu';
import EmergencyInfoMenu from '../components/EmergencyInfoMenu';
import FirstAidMenu from '../components/FirstAidMenu';
import MedicalProfileMenu from '../components/MedicalProfileMenu';
import DetailedReport from '../components/DetailedReport';
import report_types from '../common/ReportTypes';
import ReportConfirmation from '../components/ReportConfirmation';
import PopupCard from '../components/PopupCard';
import Notification from '../components/Notification';
import SafetyResourcesMenu from '../components/SafetyResourcesMenu';
import MakeDetailedReport from '../components/MakeDetailedReport';
import { fetch_all_reports, get_all_reports } from '../services/GeneralReportService';
import addNotification from 'react-push-notification';
import { UserContext } from '../contexts/UserContext';

import logo from '../icons/call.svg'
import create_new_alert_from_notification from '../services/PushNotificationService';
import UploadingReport from '../components/UploadingReport';
import ErrorCard from '../components/ErrorCard';

export default function Main() {

  // Array of report types for easy rendering
  const report_types_data = [
    report_types['medical'],
    report_types['fire'],
    report_types['natural'],
    report_types['security'],
    report_types['weather'],
  ]

  // Hook variable for showing the side menu and current (open) menu
  const [show_side_menu, set_show_side_menu] = useState(false);
  const [current_menu, set_current_menu] = useState("none");
  const [user_profile, set_user_profile] = useState(get_blank_profile());
  const [confirmation_menu, set_confirmation_menu] = useState(null);
  const [detailed_report_menu, set_detailed_report_menu] = useState(null);
  const [new_notification, set_new_notification] = useState(null);
  const [uploading_report, set_uploading_report] = useState(null);
  const [error, set_error] = useState(null);

  const [reports, set_reports] = useState([]);


  const [show_quickreports, set_show_quickreports] = useState(false);


  const [hasNotified, setHasNotified] = useState(false); // State to track if notification is sent

  const { studentNumber } = useContext(UserContext);

  const get_user_profile = () => {
    const fetchProfile = async () => {
      try {
        const fetched_profile = await get_profile(studentNumber);
        console.log(fetched_profile);
        if (fetched_profile.error) {
          set_error({
            message: fetched_profile.error
          })
          set_user_profile(get_blank_profile());
        } else {
          set_user_profile(fetched_profile);
        }

      } catch (error) {
        console.error('Error fetching profile:', error.message);
        set_user_profile(get_blank_profile());
        set_error({
          message: "Error fetching user profile."
        })
      }
    };
    fetchProfile();
  }

  useEffect(() => {
    // Create an EventSource connection to listen to server-sent events
    const eventSource_alerts = new EventSource('/alerts/pushalerts');
    const eventSource_incidents = new EventSource('/incidents/pushalerts');

    eventSource_alerts.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      //const message = JSON.parse(data.message);
      if (!hasNotified) {

        console.log(data.message);
        // Trigger the notification using react-push-notification
        const type = data.message.type;
        const lng = data.message.lng;
        const lat = data.message.lat;
        addNotification({
          title: 'Campus Safety',
          message: report_types[type].header,
          duration: 5000,
          icon: report_types[type].icon,
          native: true,
        });

        setHasNotified(true);
        setTimeout(() => {
          setHasNotified(false);
        }, 8000)

        set_new_notification(data.message);

        const incident_reports = fetch_all_reports();
        incident_reports.then(
          (incident_reports) => {
            if (incident_reports) {
              set_reports(incident_reports)
            }
          }
        )
        .catch(err => {
          set_reports([]);
          set_error({
            message: err
          })
        })
      }
    };

    eventSource_incidents.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      //const message = JSON.parse(data.message);
      if (!hasNotified) {

        console.log(data.message);
        // Trigger the notification using react-push-notification
        const type = data.message.type;
        const description = data.message.description;
        addNotification({
          title: 'Campus Safety',
          message: report_types[type].header + ": " + description,
          duration: 5000,
          icon: report_types[type].icon,
          native: true,
        });

        setHasNotified(true);
        setTimeout(() => {
          setHasNotified(false);
        }, 8000)

        set_new_notification(data.message);

        const incident_reports = fetch_all_reports();
        incident_reports.then(
          (incident_reports) => {
            if (incident_reports) {
              set_reports(incident_reports)
            }
          }
        )
        .catch(err => {
          set_reports([]);
          set_error({
            message: err
          })
        })
      }
    };

    // Cleanup on unmount
    return () => {
      eventSource_alerts.close();
    };
  }, [hasNotified]);



  useEffect(() => {
    get_user_profile();
    const incident_reports = fetch_all_reports();
    incident_reports.then(
      (incident_reports) => {
        if (incident_reports) {
          set_reports(incident_reports)
        }
      }
    )
    .catch(err => {
      set_reports([]);
      set_error({
        message: err
      })
    })

  }, [])

  /*
    Function: close_all_menus

    Description:
      Will close all popup menus
      Will be linked to onClick event of dark background so when user "clicks off" of a popup menu, it will close all other menus as well

    Arguments: N/A

    Returns: N/A
  */
  const close_all_menus = () => {
    set_current_menu("none");
    set_show_side_menu(false);
    set_detailed_report_menu(null);
    set_confirmation_menu(null);
    set_show_quickreports(false);
  }

  /*
    Function: close_menu

    Description:
      Closes the currently open menu

    Parameters: N/A

    Returns: N/A
  */
  const close_menu = () => {
    set_current_menu("none");
  }

  /*
    Function: close_confirmation

    Description:
      Closes the currently open confirmation menu

    Parameters: N/A

    Returns: N/A
  */
  const close_confirmation = () => {
    set_confirmation_menu(null);
    set_detailed_report_menu(null);
  }

  /*
    Function: render_menu

    Description:
      Renders the menu to be currently displayed on top of everything else

    Parameters: N/A

    Returns:
      A react or html component depending on the type of menu to be displayed
  */
  const render_menu = () => {
    switch (current_menu) {
      case "none":
        return <></>

      case "notifications":
        return <NotificationsMenu set_error={set_error} reports={reports} close_all_menus={close_all_menus} close_menu={close_menu}></NotificationsMenu>

      case "incident_reports":
        return <IncidentReportsMenu set_error={set_error} reports={reports} close_all_menus={close_all_menus} close_menu={close_menu}></IncidentReportsMenu>

      case "emergency_info":
        return <EmergencyInfoMenu set_error={set_error} close_menu={close_menu}></EmergencyInfoMenu>

      case "first_aid":
        return <FirstAidMenu close_menu={close_menu}></FirstAidMenu>

      case "medical_profile":
        return <MedicalProfileMenu set_error={set_error} get_user_profile={get_user_profile} close_menu={close_menu} profile={user_profile}></MedicalProfileMenu>

      case "detailed_report":
        return <DetailedReport set_error={set_error} set_detailed_report_menu={update_detailed_report_menu} report_types_data={report_types_data} close_menu={close_menu} profile={user_profile}></DetailedReport>

      case "walk_home":
        return <PopupCard set_error={set_error} isOpen={true} onClose={close_menu}> <p>Walk-home assistance information goes here.</p> </PopupCard>

      case "safety_resources":
        return <SafetyResourcesMenu set_error={set_error} close_menu={close_menu}></SafetyResourcesMenu>

      default:
        break;
    }
  }


  const update_confirmation_menu = (report) => {
    set_confirmation_menu(report);
    set_detailed_report_menu(null);
  }


  const update_detailed_report_menu = (report) => {
    set_confirmation_menu(null);
    set_detailed_report_menu(report);
  }

  const render_report_menu = () => {
    if ((confirmation_menu === null) && (detailed_report_menu === null)) {
      return <></>
    } else if (confirmation_menu) {
      return <ReportConfirmation set_error={set_error} set_uploading_report={set_uploading_report} report_type={confirmation_menu} close_all_menus={close_all_menus} close_menu={close_confirmation}></ReportConfirmation>
    } else if (detailed_report_menu) {
      return <MakeDetailedReport set_error={set_error} set_uploading_report={set_uploading_report} report_type={detailed_report_menu} close_all_menus={close_all_menus} close_menu={close_confirmation}></MakeDetailedReport>
    }
  }

  return (
    <main className='main-root'>
      {render_report_menu()}
      {error ? <ErrorCard set_error={set_error} error={error}></ErrorCard> : <></>}
      {uploading_report ? <UploadingReport report_type={uploading_report}></UploadingReport> : <></>}
      {current_menu === "none" ? <></> : render_menu()}
      <Navbar show_quickreports={show_quickreports} set_show_quickreports={set_show_quickreports} report_types_data={report_types_data} open_detailed_report_menu={() => set_current_menu("detailed_report")} set_confirmation_menu={update_confirmation_menu} />
      <Topbar set_show_side_menu={set_show_side_menu} />
      {reports === null ? <></> : <Map set_error={set_error} new_notification={new_notification} set_new_notification={set_new_notification} incident_reports={reports} />}
      <SideMenu show_side_menu={show_side_menu} set_current_menu={set_current_menu} profile={user_profile} />
      {show_side_menu ? <div className='main-dark-back' onClick={close_all_menus}></div> : <></>}
    </main>
  )
}
