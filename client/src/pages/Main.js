/**
 * File: Menu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Main page component to host items to be displayed on the main page (home page) of the app
 */
import React, { useEffect, useState } from 'react'
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

import logo from '../icons/call.svg'

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

  const [reports, set_reports] = useState(null);
  

  const [show_quickreports, set_show_quickreports] = useState(false);


  const [hasNotified, setHasNotified] = useState(false); // State to track if notification is sent


  useEffect(() => {
    // Create an EventSource connection to listen to server-sent events
    const eventSource = new EventSource('/alerts/pushalerts');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //const message = JSON.parse(data.message);
      if (!hasNotified) {

        console.log(data.message);
        // Trigger the notification using react-push-notification
        const desc = data.message.desc;
        addNotification({
          title: 'Campus Safety',
          message: desc,
          duration: 5000,
          icon: logo,
          native: true,
        });
        setHasNotified(true);
      }
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [hasNotified]);


  
  useEffect(() => {
    const fetched_profile = get_profile();
    set_user_profile(fetched_profile);

    const incident_reports = fetch_all_reports();
    incident_reports.then(
      (incident_reports) => set_reports(incident_reports)
    )
  },[])
  
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
        return <NotificationsMenu reports={reports} close_all_menus={close_all_menus} close_menu={close_menu}></NotificationsMenu> 

      case "incident_reports":
        return <IncidentReportsMenu reports={reports} close_all_menus={close_all_menus} close_menu={close_menu}></IncidentReportsMenu>

      case "emergency_info":
        return <EmergencyInfoMenu close_menu={close_menu}></EmergencyInfoMenu>
  
      case "first_aid":
        return <FirstAidMenu close_menu={close_menu}></FirstAidMenu>

      case "medical_profile":
        return <MedicalProfileMenu close_menu={close_menu} profile={user_profile}></MedicalProfileMenu>

      case "detailed_report":
        return <DetailedReport set_detailed_report_menu={update_detailed_report_menu} report_types_data={report_types_data} close_menu={close_menu} profile={user_profile}></DetailedReport>
  
      case "walk_home":
        return <PopupCard isOpen={true} onClose={close_menu}> <p>Walk-home assistance information goes here.</p> </PopupCard>

      case "safety_resources":
        return <SafetyResourcesMenu close_menu={close_menu}></SafetyResourcesMenu>
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
      return <ReportConfirmation report_type={confirmation_menu} close_all_menus={close_all_menus} close_menu={close_confirmation}></ReportConfirmation>
    } else if (detailed_report_menu) {
      return <MakeDetailedReport  report_type={detailed_report_menu} close_all_menus={close_all_menus} close_menu={close_confirmation}></MakeDetailedReport>
    }
  }

  return (
    <main className='main-root'>
        {/* <Notification></Notification> */}
        {render_report_menu()}
        {current_menu === "none" ? <></> : render_menu() }      
        <Navbar show_quickreports={show_quickreports} set_show_quickreports={set_show_quickreports} report_types_data={report_types_data} open_detailed_report_menu={() => set_current_menu("detailed_report")}  set_confirmation_menu={update_confirmation_menu}/>
        <Topbar set_show_side_menu={set_show_side_menu} />
        {reports === null ? <></> : <Map incident_reports={reports}/>}
        <SideMenu show_side_menu={show_side_menu} set_current_menu={set_current_menu} profile={user_profile}/>
        {show_side_menu ? <div className='main-dark-back' onClick={close_all_menus}></div> : <></> }
    </main>
  )
}
