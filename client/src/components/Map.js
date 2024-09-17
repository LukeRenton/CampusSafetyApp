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
import { create_map, render_report_areas } from '../services/MapService';
import MarkerPopup from './MarkerPopup';
import { render_incident_report_items } from '../services/IncidentReportsService';



export default function Map( { incident_reports } ) {
    
    const map_container = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(25);
    const [lat, setLat] = useState(-30);
    const [user_lng, set_user_lng] = useState(0);
    const [user_lat, set_user_lat] = useState(0);
    const [show_marker_popup, set_show_marker_popup] = useState(null);

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

        create_map(map, map_container, handle_movement, handle_marker_popup, incident_reports);
        // render_report_areas(handle_marker_popup, incident_reports);
    });

  return (
    <>
        {show_marker_popup === null ? <></> : <MarkerPopup report={show_marker_popup} close={() => set_show_marker_popup(null)} />}
        <section className='map-root'>
            <section ref={map_container} className="map-container" />
        </section>
    </>
  )
}
