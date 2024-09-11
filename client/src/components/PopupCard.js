import React, { useState, useEffect } from 'react';
import '../styles/PopupCard.css';
import SchedulerideCard from './SchedulerideCard'; // Import SchedulerideCard

const PopupCard = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false); // State for SchedulerideCard visibility

  // Trigger the close animation and delay actual close
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset the state
    }, 400); // Match the animation duration (0.4s = 400ms)
  };

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false); // Reset state if popup reopens
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className={`popup-content ${isClosing ? 'slide-out' : ''}`} onClick={(e) => e.stopPropagation()}>
        <h1 className='Card1-Heading' id='Main-Heading'>Going home?</h1>
        <h6 className='Card1-subheading'>No need to go home alone</h6>

        <h1 className='Card1-Heading'>Leave now</h1>
        <h6 className='Card1-subheading'>Get dropped off at your residence</h6>
        <button className='Card1-Button' onClick={() => console.log("Ride Now Button Clicked")}>Ride Now</button>

        <h1 className='Card1-Heading'>Leaving later?</h1>
        <h6 className='Card1-subheading'>Schedule a drop-off time with campus security.</h6>
        <button className='Card1-Button' onClick={() => setShowScheduler(true)}>Schedule</button> {/* Open SchedulerideCard */}

        <SchedulerideCard isOpen={showScheduler} onClose={() => setShowScheduler(false)} /> {/* Render SchedulerideCard */}
      </div>
    </div>
  );
};

export default PopupCard;
