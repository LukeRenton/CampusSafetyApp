import React, { useState } from 'react';
import '../styles/SelectRes.css'; // Use updated SelectRes CSS
import ConfirmationCard from './ConfirmationCard.js'; // Import the confirmation card

const SelectRes = ({ isOpen, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelect = (event) => {
    console.log("Selected Residence:", event.target.value);
  };

  const handleGoClick = () => {
    setShowConfirmation(true); // Show the confirmation card

    // Automatically close the confirmation card after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      onClose(); // Close the SelectRes after the confirmation fades out
    }, 5000);
  };

  if (!isOpen && !showConfirmation) return null; // Don't show if both are closed

  return (
    <>
      {/* SelectRes Card */}
      {!showConfirmation && isOpen && (
        <div className="selectres-overlay" onClick={onClose}>
          <div className="selectres-content" onClick={(e) => e.stopPropagation()}>
            <h1 className="Card1-Heading">Select Residence</h1>
            <h6 className="Card1-subheading">Choose your residence from the list</h6>

            <select className="selectres-dropdown" onChange={handleSelect}>
              <option value="residence1">Residence 1</option>
              <option value="residence2">Residence 2</option>
              <option value="residence3">Residence 3</option>
            </select>

            <button className="selectres-button" onClick={handleGoClick}>Go</button>
          </div>
        </div>
      )}

      {/* Confirmation Card */}
      {showConfirmation && <ConfirmationCard />}
    </>
  );
};

export default SelectRes;
