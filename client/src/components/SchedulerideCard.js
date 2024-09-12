import React, { useState } from 'react';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/styles.css'; // Import necessary styles
import '../styles/SchedulerideCard.css';

const SchedulerideCard = ({ isOpen, onClose, onSchedule }) => {
  const [dateTime, setDateTime] = useState(new Date());

  const handleSchedule = () => {
    console.log("Ride Scheduled for", dateTime);
    onSchedule(); // Call the parent's onSchedule function to open SelectRes
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="Card1-Heading">Schedule a Ride</h1>
        <h6 className="Card1-subheading">Pick a date and time for your ride</h6>

        {/* DateTime Picker */}
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          format="MMM DD, YYYY hh:mm A" // Date & Time format
          time={true} // Enables time selection
          className="mb-3"
        />

        <button className="Card1-Button" onClick={handleSchedule}>
          Schedule
        </button>
        <button className="Card1-Button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SchedulerideCard;
