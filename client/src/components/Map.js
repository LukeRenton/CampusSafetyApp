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
import Notification from './Notification';
import { create_new_report_from_notification } from '../services/PushNotificationService';



export default function Map( { set_location_services_enabled, set_error, incident_reports, new_notification, set_new_notification } ) {
    
    const map_container = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(25);
    const [lat, setLat] = useState(-30);
    const [user_lng, set_user_lng] = useState(0);
    const [user_lat, set_user_lat] = useState(0);
    const [show_marker_popup, set_show_marker_popup] = useState(null);
    const [show_notification, set_show_notification] = useState(null);
    // const [location_services_enabled, set_location_services_enabled] = useState(false);

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
        try {
            // Ensure only 1 map is generated
            if (!map.current) {
                const result = create_map(map, map_container, handle_movement, handle_marker_popup, incident_reports);
            }

            // Watch user's position
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            };
            const reference = navigator.geolocation.watchPosition(
            (res) => {
                set_user_coords(res.coords.longitude, res.coords.latitude)
                set_location_services_enabled(true);
                options.timeout = 10000; // longer timeouts while updating location
            },
            (err) => {

                if (err.PERMISSION_DENIED) {
                    set_error({
                        message: "Please enable your location to make reports."
                    })
                } else if (err.POSITION_UNAVAILABLE) {
                    set_error({
                        message: "Location error: Could not find your position"
                    })
                }

                set_location_services_enabled(false);
                options.timeout = 1000; // shorten timeout to find location ASAP
            }, options)
            
        } catch (err) {
            set_error({
                message: "Error loading map"
            })
        }
    },[]);

    const close_notification = () => {
        set_new_notification(null);
        set_show_notification(null);
    }

    useEffect(() => {
        // If a new notification has arrived, create 
        if (new_notification) {
            console.log(new_notification);
            const new_alert = create_new_report_from_notification(new_notification);
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
        {show_marker_popup === null ? <></> : <MarkerPopup set_error={set_error} report={show_marker_popup} close={() => set_show_marker_popup(null)} />}
        <section className='map-root'>
            <section ref={map_container} className="map-container" />
        </section>
    </>
  )
}
