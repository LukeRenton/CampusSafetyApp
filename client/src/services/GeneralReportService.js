/*
Function: get_all_reports

Description:
  Fetches all reports from backend

Parameters: N/A

Returns:
  Array of notifications
*/
export function get_all_reports() {
    // ToDo: implement actual fetch for reports
    const sample_items = [
      {
        type: 'medical',
        description: 'Near the Wits Science Stadium',
        active: true,
        date: new Date(2024,8,13,10,0,0,0),
        location: {
          lng: 28.030204,
          lat: -26.190998
        }
      },
      {
        type: 'natural',
        description: 'near the Wits Science Stadium',
        active: true,
        date: new Date(2024,8,12,10,0,0,0),
        location: {
          lng: 28.026399,
          lat: -26.190466
        }
      },
      {
        type: 'fire',
        description: 'Near the FNB Building. Please evacuate the area immediately!',
        active: true,
        date: new Date(2024,7,8,8,47,0,0),
        location: {
          lng: 28.026826,
          lat: -26.188818
        }
      }
    ]
  
    return sample_items;
  
}