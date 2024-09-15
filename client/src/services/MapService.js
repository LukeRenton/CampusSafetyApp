import MapboxCircle from 'mapbox-gl-circle';
import report_types from '../common/ReportTypes';
import { get_all_reports } from './GeneralReportService';
import mapboxgl from 'mapbox-gl';
import token from '../tokens/mapbox_token';
import { useRef } from 'react';
import marker from '../icons/medical_marker.svg'


var map;
var map_container;

export function create_map(map_in, map_container_in, map_movement_handler, marker_popup_handler) {
  // const map_container = useRef(null);
  // const map = useRef(null);
  // Token retrieval
  map = map_in;
  map_container = map_container_in;
  
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
      // map.current.setMinPitch(0);
  })

  const bounds = [
    [28.020809, -26.194245],
    [28.031961, -26.183341]
  ]

  map.current = new mapboxgl.Map({
    container: map_container.current,
    // style: 'mapbox://styles/mapbox/streets-v12',
    style: 'mapbox://styles/mitchellneilsonwits/cm12lbun601g101pj7kh63w7f',
    // center: [lng, lat],
    // zoom: zoom,
    maxBounds: bounds
});

  map.current.addControl(geolocate_control);
          
  map.current.on('load', () => {
      geolocate_control.trigger();
      render_report_areas(map, marker_popup_handler);
      render_wits_boundary(map);
      map.current.flyTo({
          center: [28.030228, -26.190955],
          zoom: 18.38,
          pitch: 60,
          bearing: 173.60
      });
      map.current.on('move', map_movement_handler); 
  });

  
}

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

export function render_wits_boundary(map) {
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

function handle_marker_click(report, marker_popup_handler) {
  const coords = report.location;
  map.current.flyTo({
    center: [coords.lng, coords.lat],
    zoom: 18.80
  })
  marker_popup_handler(report);

  console.log(report);
}

export function render_report_areas(map, marker_popup_handler) {

    const all_reports = get_all_reports();

    all_reports.forEach((report,i) => {
        map.current.addSource("polygon"+String(i), createGeoJSONCircle([report.location.lng, report.location.lat], report_types[report.type].radius));
        map.current.addLayer({
            "id": "polygon"+String(i),
            "type": "fill",
            "source": "polygon"+String(i),
            "layout": {},
            "paint": {
                "fill-color": report_types[report.type].colour,
                "fill-opacity": 0.5,
            }
        });
        map.current.addLayer({
            "id": "outline"+String(i),
            "type": "line",
            "source": "polygon"+String(i),
            "layout": {},
            "paint": {
                'line-color': '#000',
                'line-width': 1
            }
        });
        
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${report_types[report.type].marker})`;
        el.style.paddingBottom = `45px`;
        el.style.backgroundRepeat = 'no-repeat';
        el.style.width = `${report_types[report.type].icon_size}px`;
        el.style.height = `${report_types[report.type].icon_size}px`;
        el.style.backgroundSize = '100%';
        el.style.display = 'block';
        el.style.border = 'none';
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {handle_marker_click(report, marker_popup_handler)});
        
        new mapboxgl.Marker(el).setLngLat([report.location.lng, report.location.lat]).addTo(map.current);
    })

    


    // var myCircle2 = new MapboxCircle({lat: all_reports[1].location.lat+1, lng: all_reports[1].location.lng}, 6000, {
    //     fillColor: report_types[all_reports[1].type].colour,
    // }).addTo(map.current)

}

export function move_map_to(coord) {
  map.current.flyTo({
    center: coord,
    zoom: 18.80
  })
}