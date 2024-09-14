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
          lat: -26,
          lng: 28
        }
      },
      {
        type: 'natural',
        description: 'near the Wits Science Stadium',
        active: true,
        date: new Date(2024,8,12,10,0,0,0),
        location: {
          lat: -26.02,
          lng: 28
        }
      },
      {
        type: 'fire',
        description: 'Near the FNB Building. Please evacuate the area immediately!',
        active: true,
        date: new Date(2024,7,8,8,47,0,0),
        location: {
          lat: -25.98,
          lng: 28
        }
      }
    ]
  
    return sample_items;
  
}