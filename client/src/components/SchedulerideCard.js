/**
 * File: SchedulerideCard.js
 * 
 * Author: Anand
 * 
 * Description:
 *  Card to handle scheduling a ride
 */

import React, { useState } from 'react';
import '../styles/SchedulerideCard.css';

const SchedulerideCard = ({ isOpen, onClose, onSchedule }) => {
  const [time, setTime] = useState('10:00'); // Default time

  /*
    Function: handle_schedule

    Description:
      Handles ride scheduling and email upload
    
    Parameters: N/A

    Returns: N/A
  */
  const handleSchedule = async () => {
    console.log("Ride Scheduled for", time);
    try {
      await fetch('/email/store-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time }),
      });
      onSchedule(time); // Trigger the next step in the flow
      onClose();
    } catch (error) {
      console.error('Error storing time:', error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="scheduleride-overlay" onClick={onClose}>
      <div className="scheduleride-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="scheduleride-heading">Schedule a Ride</h1>
        <h6 className="scheduleride-subheading">Pick a time for your ride</h6>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-picker"
        />

        <button className="scheduleride-button" onClick={handleSchedule}>
          Schedule
        </button>
      </div>
    </div>
  );
};

export default SchedulerideCard;
