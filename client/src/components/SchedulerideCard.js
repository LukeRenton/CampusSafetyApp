// src/components/SchedulerideCard.js
import React, { useState } from 'react';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/styles.css'; // Import necessary styles
import '../styles/SchedulerideCard.css';

const SchedulerideCard = ({ isOpen, onClose }) => {
  const [dateTime, setDateTime] = useState(new Date());

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h1 className='Card1-Heading'>Schedule a Ride</h1>
        <h6 className='Card1-subheading'>Pick a time for your ride</h6>

        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          format="MMM DD, YYYY hh:mm A"
          timeFormat="HH:mm"
          className="mb-3"
        />

        <button className='Card1-Button' onClick={() => console.log("Ride Scheduled for", dateTime)}>Schedule</button>
        <button className='Card1-Button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SchedulerideCard;
