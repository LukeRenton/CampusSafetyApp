import { get_user_coords } from "./MapService";

export async function make_alert_report(type) {

    try {

      const position = get_user_coords();
      
      const res = await fetch('/alerts/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: type,
            active: 1,
            latitude: position.lat,
            longitude: position.lng
        })
  
      }).then((res) => res.json())
      .catch(err => {
        return {
          error: "Error sending alert"
        }
      })


      if (!res.error) {
        console.log(res);
        return {
          success: "success"
        }
      } else {
        return {
          error: "Error sending alert"
        }
      }


      
    } catch (err) {
      // Error handling!
      console.log(err);
      return {
        error: "Error sending alert"
      }
    }
  }