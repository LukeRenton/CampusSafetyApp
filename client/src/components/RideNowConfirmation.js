import React, { useState, useEffect } from 'react';
import '../styles/RideNowConfirmation.css'; // Specific to RideNowConfirmation
import '../styles/PopupCard.css'; // For slide-out animation

const RideNowConfirmation = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose(); // Automatically close after 5 seconds with animation
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  const handleClose = () => {
    console.log("Closing confirmation with slide-out");
    setIsClosing(true); // Trigger slide-out animation
    setTimeout(() => {
      onClose(); // Call onClose after animation completes
    }, 400); // Match animation duration
  };

  return (
    <div className="ride-now-confirmation-overlay" onClick={handleClose}>
      <div
        className={`popup-content ${isClosing ? 'slide-out' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        <h1 className="confirmation-heading">You're all set!</h1>
        <p className="confirmation-subheading">Make your way to the nearest campus security office.</p>
      </div>
    </div>
  );
};

export default RideNowConfirmation;
