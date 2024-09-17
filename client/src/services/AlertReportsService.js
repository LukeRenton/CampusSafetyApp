export async function make_alert_report(type) {

    try {
  
      // if ("geolocation" in navigator) {
        // console.log("here!!");
        // navigator.geolocation.getCurrentPosition(async (position) => {
          const position = {
            coords: {
              latitude:  -26.191,
              longitude: 28.0302
            }
          }
          
          const res = await fetch('/alerts/alerts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                active: 1,
                longitude: position.coords.longitude, 
                latitude: position.coords.latitude,
            })
      
          }).then((res) => res.json());
      
          if (res.ok) {
            console.log(res);
          }
  
          
        // })
      // } else {
          // return {
            // error: 'unable to get location: locator disabled'
          // }
      // }
      
    } catch (err) {
      // Error handling!
      console.log(err);
    }
  }