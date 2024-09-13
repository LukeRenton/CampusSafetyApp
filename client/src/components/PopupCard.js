import React, { useState, useEffect } from 'react';
import '../styles/PopupCard.css';
import SchedulerideCard from './SchedulerideCard'; // Import SchedulerideCard
import SelectRes from './SelectRes'; // Import SelectRes

const PopupCard = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showSelectRes, setShowSelectRes] = useState(false);
  const [hidePopupContent, setHidePopupContent] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
        setShowScheduler(false);
        setShowSelectRes(false);
        setHidePopupContent(false);
      }, 400); // Match the animation duration
    }
  }, [isOpen]);

  const handleScheduleComplete = () => {
    setShowScheduler(false);
    setShowSelectRes(true);
  };

  const openSchedulerideCard = () => {
    setShowScheduler(true);
    setHidePopupContent(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400); // Match the animation duration
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className={`popup-content ${isClosing ? 'slide-out' : ''}`} onClick={(e) => e.stopPropagation()}>
        {!hidePopupContent && !showScheduler && !showSelectRes && (
          <>
            <h1 className='Card1-Heading' id='Main-Heading'>Going home?</h1>
            <h6 className='Card1-subheading'>No need to go home alone</h6>

            <h1 className='Card1-Heading'>Leave now</h1>
            <h6 className='Card1-subheading'>Get dropped off at your residence</h6>
            <button className='Card1-Button' onClick={() => console.log("Ride Now Button Clicked")}>Ride Now</button>

            <h1 className='Card1-Heading'>Leaving later?</h1>
            <h6 className='Card1-subheading'>Schedule a drop-off time with campus security.</h6>
            <button className='Card1-Button' onClick={openSchedulerideCard}>Schedule</button>
          </>
        )}

        {showScheduler && (
          <SchedulerideCard isOpen={showScheduler} onClose={() => setShowScheduler(false)} onSchedule={handleScheduleComplete} />
        )}

        {showSelectRes && (
          <SelectRes isOpen={showSelectRes} onClose={() => setShowSelectRes(false)} />
        )}
      </div>
    </div>
  );
};

export default PopupCard;
