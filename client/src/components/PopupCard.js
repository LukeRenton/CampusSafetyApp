import React from 'react';
import '../styles/PopupCard.css'; // Assuming you have your styles here

const PopupCard = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>This is a popup card!</p>
        <button onClick={onClose}>Close</button> {/* Close button */}
      </div>
    </div>
  );
};

export default PopupCard;
