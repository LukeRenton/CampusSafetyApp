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
import SafetyResourcesMenu from '../components/SafetyResourcesMenu';
import MakeDetailedReport from '../components/MakeDetailedReport';
import { fetch_all_reports } from '../services/GeneralReportService';
import { UserContext } from '../contexts/UserContext';

import UploadingReport from '../components/UploadingReport';
import ErrorCard from '../components/ErrorCard';
import { useNavigate } from 'react-router-dom';
import FindingLocation from '../components/FindingLocation';

export default function Main( { set_user } ) {

  // Array of report types for easy rendering
  const report_types_data = [
    report_types['medical'],
    report_types['fire'],
    report_types['natural'],
    report_types['security'],
    report_types['weather'],
  ]

  // Showing side menu
  const [show_side_menu, set_show_side_menu] = useState(false);
  // Showing current menu within sidemenu
  const [current_menu, set_current_menu] = useState("none");
  // Current user profile
  const [user_profile, set_user_profile] = useState(get_blank_profile());
  // Is the current user profile valid
  const [valid_profile, set_valid_profile] = useState(false);
  // Confirmation menu modal (popup)
  const [confirmation_menu, set_confirmation_menu] = useState(null);
  // Detailed report menu to allow user to add photo and description to report
  const [detailed_report_menu, set_detailed_report_menu] = useState(null);
  // New notification menu
  const [new_notification, set_new_notification] = useState(null);
  // Spinner and card to indicate report is currently uploading
  const [uploading_report, set_uploading_report] = useState(null);
  // Error card notification (handled in different cases)
  const [error, set_error] = useState(null);
  // Reports array for ALL incident and alert reports
  const [reports, set_reports] = useState([]);
  // Show quickreports menu at navbar button
  const [show_quickreports, set_show_quickreports] = useState(false);
  // Handle if this user has been notified yet
  const [hasNotified, setHasNotified] = useState(false); // State to track if notification is sent
  // Student number of logged in user
  const { studentNumber } = useContext(UserContext);
  // Check if reports have been loaded yet
  const [reports_loaded, set_reports_loaded] = useState(false);
  // Checking if location services are enabled
  const [location_services_enabled, set_location_services_enabled] = useState(false);

  const navigate = useNavigate();

  const handle_signout = () => {
    set_user(null);
    localStorage.removeItem('user');
    navigate('/');
  }

  /*
    Function: get_user_profile

    Description:
      Fetches the user profile based on the current student number

    Arguments: N/A

    Returns: N/A
  */  
  const get_user_profile = async () => {
    if (!studentNumber) {
      // handle_signout();
      navigate('/');
      return;
    }

    try {
      const fetched_profile = await get_profile(studentNumber);
      
      if (fetched_profile.error) {
        set_error({
          message: fetched_profile.error
        })
        set_user_profile(get_blank_profile());
        set_valid_profile(false);
        set_user(null);

      } else {
        set_valid_profile(true);
        set_user_profile(fetched_profile);
        set_user(studentNumber);
      }

    } catch (error) {
      console.error('Error fetching profile:', error.message);
      set_user_profile(get_blank_profile());
      set_valid_profile(false);
      set_error({
        message: "Error fetching user profile."
      })
      set_user(null);
    }
    console.log("test here");
    // fetchProfile();
  }

  const handle_fetch_reports = async () => {
    if (reports_loaded) {
      set_reports_loaded(false);
      const incident_reports = await fetch_all_reports();
      incident_reports.then(
        (incident_reports) => {
          if (incident_reports) {
            set_reports(incident_reports)
          } else {
            set_reports([])
          }
          set_reports_loaded(true);
        }
      )
      .catch(err => {
        // Handle error
        set_reports([]);
        set_error({
          message: err
        })
        set_reports_loaded(true);
      })
    }
  }


  useEffect(() => {
    // Create an EventSource connection to listen to server-sent events
    const eventSource_alerts = new EventSource('/alerts/pushalerts');
    const eventSource_incidents = new EventSource('/incidents/pushalerts');

    eventSource_alerts.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      //const message = JSON.parse(data.message);
      // if (!hasNotified) {

        // Trigger the notification using react-push-notification
        const type = data.message.type;
        const lng = data.message.lng;
        const lat = data.message.lat;

        // addNotification({
        //   title: 'Campus Safety',
        //   message: report_types[type].header,
        //   duration: 5000,
        //   icon: report_types[type].icon,
        //   native: true,
        //   header: report_types[type].header,
        //   report: data.message
        // });

        // setHasNotified(true);
        // setHasNotified(false);

        set_new_notification(data.message);
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(report_types[type].header, {
            body: report_types[type].header + " Alert",
            icon: report_types[type].icon,
            data: {
              url: '/'
            }
          });
        })

        handle_fetch_reports();
        
      // }
    };

    eventSource_incidents.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //const message = JSON.parse(data.message);
      // if (!hasNotified) {

        // Trigger the notification using react-push-notification
        const type = data.message.type;
        const description = data.message.description;

        // addNotification({
        //   title: 'Campus Safety',
        //   message: report_types[type].header + ": " + description,
        //   duration: 5000,
        //   icon: report_types[type].icon,
        //   native: true,
        //   header: report_types[type].header,
        //   report: data.message
        // });

        set_new_notification(data.message);
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(report_types[type].header, {
            body: description,
            icon: report_types[type].icon,
            data: {
              url: '/'
            }
          });
        })

        handle_fetch_reports();
      // }
    };

    // Cleanup on unmount
    return () => {
      eventSource_alerts.close();
      eventSource_incidents.close()
    };
  }, [hasNotified]);



  useEffect(() => {
    get_user_profile();
    const incident_reports = fetch_all_reports();
    incident_reports.then(
      (incident_reports) => {
        if (incident_reports) {
          set_reports(incident_reports)
        } else {
          set_reports([]);
        }
        set_reports_loaded(true);
      }
    )
    .catch(err => {
      // Handle error
      set_reports([]);
      set_error({
        message: err
      })
      set_reports_loaded(true);
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

  /*
    Function: update_confirmation_menu

    Description:
      Sets the confirmation menu

    Parameters:
      reports: the report to be confirmed

    Returns: N/A
  */
  const update_confirmation_menu = (report) => {
    set_confirmation_menu(report);
    set_detailed_report_menu(null);
  }

  /*
    Function: update_detailed_report_menu

    Description:
      Sets the detailed reports menu

    Parameters:
      reports: the report (with type) to be made

    Returns: N/A
  */
  const update_detailed_report_menu = (report) => {
    set_confirmation_menu(null);
    set_detailed_report_menu(report);
  }

  /*
    Function: render_report_menu

    Description:
      Renders the report menu: Either confrimation or detailed report

    Parameters: N/A

    Returns: N/A
  */
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
      {!location_services_enabled ? <FindingLocation></FindingLocation> : <></>}
      {error ? <ErrorCard set_error={set_error} error={error}></ErrorCard> : <></>}
      {uploading_report ? <UploadingReport report_type={uploading_report}></UploadingReport> : <></>}
      {current_menu === "none" ? <></> : render_menu()}
      <Navbar uploading_report={uploading_report} location_services_enabled={location_services_enabled} show_quickreports={show_quickreports} set_show_quickreports={set_show_quickreports} report_types_data={report_types_data} open_detailed_report_menu={() => set_current_menu("detailed_report")} set_confirmation_menu={update_confirmation_menu} />
      <Topbar set_show_side_menu={set_show_side_menu} />
      {reports_loaded ? <Map set_location_services_enabled={set_location_services_enabled} set_error={set_error} new_notification={new_notification} set_new_notification={set_new_notification} incident_reports={reports} /> : <></>}
      <SideMenu handle_signout={handle_signout} valid_profile={valid_profile} show_side_menu={show_side_menu} set_current_menu={set_current_menu} profile={user_profile} />
      {show_side_menu ? <div className='main-dark-back' onClick={close_all_menus}></div> : <></>}
    </main>
  )
}
