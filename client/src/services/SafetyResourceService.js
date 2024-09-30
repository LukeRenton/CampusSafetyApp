export async function fetch_safety_resources() {


    const res = await fetch('/resources/safety-resources', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
      .then((resources) => {
        return resources;
      })
      .catch(err => {
        return {
            error: "Error fetching safety resources"
        }
      })
    
    if (res.error) {
        return {
            error: "Error fetching safety resources"
        }
    }

    return res;
}