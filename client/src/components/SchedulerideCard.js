import React, { useState } from 'react';
import '../styles/SchedulerideCard.css';

const SchedulerideCard = ({ isOpen, onClose, onSchedule }) => {
  const [time, setTime] = useState('10:00'); // Default time

  const handleSchedule = () => {
    console.log("Ride Scheduled for", time);
    onSchedule(); // Call the parent's onSchedule function to trigger the transition
    onClose();    // Close the SchedulerideCard
  };

  if (!isOpen) return null;

  return (
    <div className="scheduleride-overlay" onClick={onClose}>
      <div className="scheduleride-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="scheduleride-heading">Schedule a Ride</h1>
        <h6 className="scheduleride-subheading">Pick a time for your ride</h6>

        {/* Native Time Input */}
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
