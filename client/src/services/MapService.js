/**
 * File: MapService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service for map creation and interaction
 */

import report_types from '../common/ReportTypes';
import { get_all_reports } from './GeneralReportService';
import mapboxgl from 'mapbox-gl';
import token from '../tokens/mapbox_token';

var map;
var map_container;

/*
  Function: create_map

  Description:
    Creates the mapbox object with original settings

  Parameters:
    map_in: map object to be used from mapbox
    map_container_in: map container to be used from mapbox 
    map_movement_handler: handler to be called when movement occurs on the map
    marker_popup_handler: handler to be called when marker popup must be shown

  Returns: N/A

*/
export function create_map(map_in, map_container_in, map_movement_handler, marker_popup_handler, incident_reports) {
  
  try {
    map = map_in;
    map_container = map_container_in;
    
    // Token retrieval
    mapboxgl.accessToken = token;

    
    // Defining map information from Mapbox API
    const geolocate_control = new mapboxgl.GeolocateControl({positionOptions: {
                                                                    enableHighAccuracy: true
                                                                },
                                                            trackUserLocation: true,
                                                            showUserHeading: true,
                                                            showAccuracyCircle: false
                                                            });

    geolocate_control.on('geolocate', () => {
        console.log('geo occurred');
        // map.current.flyTo({
        //   center: [28.030228, -26.190955],
        //   zoom: 18.38,
        //   pitch: 60,
        //   bearing: 173.60
        // });
    })

    const bounds = [
      [28.020809, -26.194245],
      [28.031961, -26.183341]
    ]

    map.current = new mapboxgl.Map({
      container: map_container.current,
      // style: 'mapbox://styles/mapbox/streets-v12',
      style: 'mapbox://styles/mitchellneilsonwits/cm12lbun601g101pj7kh63w7f',
      // maxBounds: bounds  
  });

    map.current.addControl(geolocate_control);
    
    let result_map_load;

    map.current.on('load', () => {
        geolocate_control.trigger();
        result_map_load = render_report_areas(marker_popup_handler, incident_reports);
        

        render_wits_boundary();
        map.current.flyTo({
            center: [28.030228, -26.190955],
            zoom: 18.38,
            pitch: 60,
            bearing: 173.60
        });
        map.current.on('move', map_movement_handler); 
    }); 

    if (result_map_load.error) {
      return {
        error: "Could not render areas on the map"
      }
    }

    return {
      success: 'success'
    }
  } catch (err) {
    return {
      error: "Could not load map correctly"
    }
  }
}

/*
  Function: createGeoJSONCircle

  Description:
    Creates a circle to be displayed on the map

  Parameters:
    center: center of circle
    radiusInKm: radius of circle
    points: approximated points (automated to 64)

  Returns:
    geoJSON object

  Reference: https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js/39006388#39006388
*/
function createGeoJSONCircle(center, radiusInKm, points) {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ret]
                }
            }]
        }
    };
};


/*
  Function: render_wits_boundary

  Description:
    Renders a black line around Wits to show bordered area

  Parameters: N/A

  Returns: N/A
*/
function render_wits_boundary() {
    map.current.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            // These coordinates outline Maine.
            coordinates: [
              [

                [28.020683, -26.183784],
                [28.020316, -26.184757],
                [28.020702, -26.187091],
                [28.021799, -26.186954],
                [28.022123, -26.190367],
                [28.020041, -26.191086],
                [28.020394, -26.191877],
                [28.020505, -26.193196],
                [28.020610, -26.193879],
                [28.020776, -26.193945],
                [28.022105, -26.193732],
                [28.023721, -26.193324],
                [28.027553, -26.192926],
                [28.028464, -26.193272],
                [28.029150, -26.193453],
                [28.033255, -26.192972],
                [28.033157, -26.192237],
                [28.032318, -26.191001],
                [28.032118, -26.190624],
                [28.032092, -26.190291],
                [28.032117, -26.190081],
                [28.033025, -26.188050],
                [28.032994, -26.187884],
                [28.032730, -26.187359],
                [28.032438, -26.186960],
                [28.032082, -26.186626],
                [28.031498, -26.186319],
                [28.030526, -26.186023],
                [28.030100, -26.185882],
                [28.029229, -26.185684],
                [28.027188, -26.185186],
                [28.023798, -26.184265],
                [28.022383, -26.184042],
                [28.021012, -26.183894],
              ]
            ]
          }
        }
    });

    map.current.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        layout: {},
        paint: {
          'fill-color': '#ffffff',
          'fill-opacity': 0.1
        }
      });

      map.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'maine',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3
        }
      });
}

/*
  Function: handle_marker_click

  Description:
    Handles when a marker is clicked on the map to zoom to marker and show popup

  Parameters:
    report: report for which marker information should be shown
    marker_popup_handler: handler to show popup for marker
  
  Returns: N/A
*/
export default function handle_marker_click(report, marker_popup_handler) {
  const coords = report.location;
  map.current.flyTo({
    center: [coords.lng, coords.lat],
    zoom: 18.80
  })
  marker_popup_handler(report);
}

let report_counter = 0;

export function add_new_report_area(marker_popup_handler, report) {
  console.log(report);
  map.current.addSource("polygon"+String(report_counter), createGeoJSONCircle([report.location.lng, report.location.lat], report_types[report.type].radius));
  map.current.addLayer({
      "id": "polygon"+String(report_counter),
      "type": "fill",
      "source": "polygon"+String(report_counter),
      "layout": {},
      "paint": {
          "fill-color": report_types[report.type].colour,
          "fill-opacity": 0.5,
      }
  });
  // map.current.addLayer({
  //     "id": "outline"+String(i),
  //     "type": "line",
  //     "source": "polygon"+String(i),
  //     "layout": {},
  //     "paint": {
  //         'line-color': '#000',
  //         'line-width': 1
  //     }
  // });
  
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = `url(${report_types[report.type].marker})`;
  el.style.paddingBottom = `45px`;
  el.style.backgroundRepeat = 'no-repeat';
  el.style.width = `${report_types[report.type].icon_size}px`;
  el.style.height = `${report_types[report.type].icon_size + 45}px`;
  el.style.backgroundSize = '100%';
  el.style.display = 'block';
  el.style.border = 'none';
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {handle_marker_click(report, marker_popup_handler)});
  
  new mapboxgl.Marker(el).setLngLat([report.location.lng, report.location.lat]).addTo(map.current);
  report_counter += 1;
}

/*
  Function: render_report_areas

  Description:
    Renders all ACTIVE reports as areas to map

  Parameters:
    marker_popup_handler: handler to show popup when marker for a report is clicked on map
  
  Returns: N/A
*/
export function render_report_areas(marker_popup_handler, all_reports) {

  try {
    console.log("rendering areas");
    // console.log(all_reports);

    // const all_reports = get_all_reports();

    all_reports.forEach((report,i) => {
      if (report.active) {
        add_new_report_area(marker_popup_handler, report);
      }
    })

    return {
      success: 'success'
    }

  } catch (err) {
    return {
      error: err
    }
  }
}

/*
  Function: move_map_to

  Description:
    Moves the map to a specific location

  Parameters:
    coord: the coordinate to move the map to
  
  Returns: N/A
*/
export function move_map_to(coord) {
  map.current.flyTo({
    center: coord,
    zoom: 18.80
  })
}


/*
  Function: get_user_coords

  Description:
    Gets the user map coordinates
  
  Parameters: N/A

  Returns:
    User coordinates in json object
*/
export function get_user_coords() {
  // if ("geolocation" in navigator) {
  //   console.log("here!!");
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position);
  //       return {
  //         lng: position.coords.longitude,
  //         lat: position.coords.latitude,
  //         error: null
  //       }
  //   })
  // } else {
  //     return {
  //       error: 'unable to get location: locator disabled'
  //     }
  // }
  return user_coords;
}




const user_coords = {
  lng: 0,
  lat: 0
}

export function set_user_coords(lng, lat) {
  user_coords.lat = lat;
  user_coords.lng = lng;

  console.log(user_coords);
}