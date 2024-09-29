import React, { useState, useEffect } from 'react';
import '../styles/PopupCard.css';
import SchedulerideCard from './SchedulerideCard';
import SelectRes from './SelectRes';
import RideNowConfirmation from './RideNowConfirmation'; // Import the new confirmation card

const PopupCard = ({ isOpen, onClose }) => {

  const [showPopup, setShowPopup] = useState(false);

  const [isClosing, setIsClosing] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showSelectRes, setShowSelectRes] = useState(false);
  const [showRideNowConfirmation, setShowRideNowConfirmation] = useState(false);
  const [hidePopupContent, setHidePopupContent] = useState(false);

  useEffect(() => {
    setShowPopup(true);
    if (!isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
        setShowScheduler(false);
        setShowSelectRes(false);
        setShowRideNowConfirmation(false);
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
    //handleClose();
  };

  const handleRideNowClick = () => {
    setHidePopupContent(true);
    setShowRideNowConfirmation(true); // Show Ride Now confirmation card
    //handleClose(); // Close the PopupCard
  };

  const handleClose = () => {
    console.log("Closing PopupCard");
    setIsClosing(true);
    setShowPopup(false);
    setTimeout(() => {
      onClose();
    }, 400); // Match the animation duration
  };

  const handle_close_ride_now_confirmation = () => {
    setShowRideNowConfirmation(false);
    onClose();
  }

  if (!isOpen && !isClosing) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className={`popup-content ${showPopup ? 'popup-content-show' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className='popup-container'>
          {!hidePopupContent && !showScheduler && !showSelectRes && !showRideNowConfirmation && (
            <>
              <h1 className='Card1-Heading' id='Main-Heading'>Walk Home Assistance</h1>
              {/* <h6 className='Card1-subheading'>No need to go home alone</h6> */}

              <h1 className='Card1-Heading'>Leave now</h1>
              <h6 className='Card1-subheading'>Get dropped off at your residence</h6>
              <button className='Card1-Button' onClick={handleRideNowClick}>Ride Now</button>

              <h1 className='Card1-Heading'>Leaving later?</h1>
              <h6 className='Card1-subheading'>Schedule a drop-off time with campus security.</h6>
              <button className='Card1-Button' onClick={openSchedulerideCard}>Schedule</button>
            </>
          )}

          {showScheduler && (
            <SchedulerideCard isOpen={showScheduler} onClose={() => setShowScheduler(false)} onSchedule={handleScheduleComplete} />
          )}

          {showSelectRes && (
            <SelectRes isOpen={showSelectRes} onClose={handleClose} />
          )}

          {showRideNowConfirmation && (
            <RideNowConfirmation onClose={handleClose} show_sub_message={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
