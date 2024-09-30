/**
 * File: Map.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Component to display the Mabox map
 *  Uses mapbox-gl api for react
 */

import React, { useRef, useEffect, useState } from 'react';
import '../styles/Map.css'
import handle_marker_click, { add_new_report_area, create_map, render_report_areas, set_user_coords } from '../services/MapService';
import MarkerPopup from './MarkerPopup';
import { render_incident_report_items } from '../services/IncidentReportsService';
import Notification from './Notification';
import create_new_alert_from_notification from '../services/PushNotificationService';



export default function Map( { set_error, incident_reports, new_notification, set_new_notification } ) {
    
    const map_container = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(25);
    const [lat, setLat] = useState(-30);
    const [user_lng, set_user_lng] = useState(0);
    const [user_lat, set_user_lat] = useState(0);
    const [show_marker_popup, set_show_marker_popup] = useState(null);
    const [show_notification, set_show_notification] = useState(null);

    /*
        Function: handle_marker_popup

        Description:
            Shows the marker popup information when a marker is pressed

        Parameters:
            report: The report for which the popup is being shown

        Returns: N/A
    */
    const handle_marker_popup = (report) => {
        set_show_marker_popup(report);
    }

    /*
        Function: handle_movement

        Description:
            Handles when movement occurs on the map
        
        Parameters: N/A

        Returns: N/A
    */
    const handle_movement = () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
    }
    
    // On component load, add the map and add required parts
    useEffect(() => {
        if (map.current) return; // Ensure only 1 map object from mapbox is made
        console.log("inside map.js");
        console.log(incident_reports);

        try {
            const result = create_map(map, map_container, handle_movement, handle_marker_popup, incident_reports);
            console.log(result);

            // render_report_areas(handle_marker_popup, incident_reports);

            // Watch user's position
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            };
            const reference = navigator.geolocation.watchPosition((res) => set_user_coords(res.coords.longitude, res.coords.latitude), (err) => {console.log(err)}, options);
        } catch (err) {
            console.log(err);
        }
    },[]);

    const close_notification = () => {
        set_new_notification(null);
        set_show_notification(null);
    }

    useEffect(() => {
        console.log("new notification just arrived!!");
        console.log(new_notification);
        if (new_notification) {
            const new_alert = create_new_alert_from_notification(new_notification);
            set_show_notification(new_alert);
            add_new_report_area(handle_marker_popup, new_alert);
        }
    },[new_notification])

    const go_to = () => {
        close_notification();
        handle_marker_click(show_notification, handle_marker_popup);
    }

  return (
    <>
        {show_notification ? <Notification go_to={go_to} close_notification={close_notification} report={show_notification}></Notification> : <></>}
        {show_marker_popup === null ? <></> : <MarkerPopup report={show_marker_popup} close={() => set_show_marker_popup(null)} />}
        <section className='map-root'>
            <section ref={map_container} className="map-container" />
        </section>
    </>
  )
}
