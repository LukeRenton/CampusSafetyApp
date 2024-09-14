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
import { createGeoJSONCircle, render_wits_boundary } from '../services/MapService';
import MapboxCircle from 'mapbox-gl-circle';
import { render_report_areas } from '../services/MapService';



export default function Map() {
    
    // Token retrieval
    mapboxgl.accessToken = token;

    // Defining map information from Mapbox API
    const map_container = useRef(null);
    const map = useRef(null);
    const geolocate_control = new mapboxgl.GeolocateControl({positionOptions: {
                                                                    enableHighAccuracy: true
                                                                },
                                                            trackUserLocation: true,
                                                            showUserHeading: true,
                                                            showAccuracyCircle: false
                                                            });

    geolocate_control.on('geolocate', () => {
        console.log('geo occurred');
        // map.current.setMinPitch(0);
    })
    const [lng, setLng] = useState(25);
    const [lat, setLat] = useState(-30);
    const [zoom, setZoom] = useState(15);

    const bounds = [
        [28.020809, -26.194245],
        [28.031961, -26.183341]
    ]
    
    // On component load, add the map and add required parts
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: map_container.current,
            // style: 'mapbox://styles/mapbox/streets-v12',
            style: 'mapbox://styles/mitchellneilsonwits/cm12lbun601g101pj7kh63w7f',
            center: [lng, lat],
            zoom: zoom,
            maxBounds: bounds
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        
        map.current.addControl(geolocate_control);
        
        map.current.on('load', () => {
            geolocate_control.trigger();
            // map.current.flyTo({pitch: 60});
            render_report_areas(map);
            render_wits_boundary(map);
            map.current.flyTo({
                center: [28.030228, -26.190955],
                zoom: 18.38,
                pitch: 60,
                bearing: 173.60
            });

            // map.current.setZoom(18.78);
            // map.current.setPitch(60);
            // map.current.setBearing(173.60);
            // map.current.setCenter([28.030199, -26.191122]);
        });

        // map.current.on('')
    });

  return (
    <section className='map-root'>
        <section ref={map_container} className="map-container" />
    </section>
  )
}
