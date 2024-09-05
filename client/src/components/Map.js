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
                                                            showUserHeading: true
                                                            });
    geolocate_control.on('geolocate', () => {
        console.log('geo occurred');
    })
    const [lng, setLng] = useState(25);
    const [lat, setLat] = useState(-30);
    const [zoom, setZoom] = useState(0);

    // On component load, add the map and add required parts
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: map_container.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.addControl(geolocate_control);

        map.current.on('load', () => {
            geolocate_control.trigger();
        });
        
        // return () => {
        //     map.current.remove();
        // };
    });


  return (
    <section className='map-root'>
        <section ref={map_container} className="map-container" />
    </section>
  )
}
