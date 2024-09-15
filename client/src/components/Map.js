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
import mapboxgl from 'mapbox-gl';
import '../styles/Map.css'
import token from '../tokens/mapbox_token';
import { create_map, createGeoJSONCircle, render_wits_boundary } from '../services/MapService';
import MapboxCircle from 'mapbox-gl-circle';
import { render_report_areas } from '../services/MapService';
import MarkerPopup from './MarkerPopup';



export default function Map() {
    
    const map_container = useRef(null);
    const map = useRef(null);



    const [lng, setLng] = useState(25);
    const [lat, setLat] = useState(-30);
    const [zoom, setZoom] = useState(15);

    const [show_marker_popup, set_show_marker_popup] = useState(null);

    const handle_marker_popup = (report) => {
        console.log("popup for marker!");
        set_show_marker_popup(report);
    }

    const handle_movement = () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
    }
    
    // On component load, add the map and add required parts
    useEffect(() => {
        if (map.current) return;
        create_map(map, map_container, handle_movement, handle_marker_popup);
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
