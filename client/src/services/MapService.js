import MapboxCircle from 'mapbox-gl-circle';
import report_types from '../common/ReportTypes';
import { get_all_reports } from './GeneralReportService';

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

export function render_report_areas(map) {

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
                "fill-opacity": 0.5
            }
        });
    })

    


    // var myCircle2 = new MapboxCircle({lat: all_reports[1].location.lat+1, lng: all_reports[1].location.lng}, 6000, {
    //     fillColor: report_types[all_reports[1].type].colour,
    // }).addTo(map.current)

}