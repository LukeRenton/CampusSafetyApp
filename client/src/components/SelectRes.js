import React, { useState } from 'react';
import '../styles/SelectRes.css'; // Use updated SelectRes CSS
import ConfirmationCard from './ConfirmationCard.js'; // Import the confirmation card
import RideNowConfirmation from './RideNowConfirmation.js';

const SelectRes = ({ isOpen, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState(''); // State to store selected residence

  const handleSelect = (event) => {
    const residence = event.target.value;
    setSelectedResidence(residence); // Update the selected residence
    console.log("Selected Residence:", residence);
  };

  const handleGoClick = async () => {
    console.log("Selected Residence:", selectedResidence);
  
    try {
      await fetch('/email/store-residence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ residence: selectedResidence }), // Use selectedResidence here
      });
      setShowConfirmation(true); // Show confirmation after sending the email
      setTimeout(() => {
        setShowConfirmation(false);
        onClose();
      }, 5000);
    } catch (error) {
      console.error('Error storing residence or sending email:', error);
    }
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
              <option value="">Select a residence</option>
              <option value="Noswal Hall">Noswal Hall</option>
              <option value="Ernest Oppenheimer Hall">Ernest Oppenheimer Hall</option>
              <option value="Knockando Hall">Knockando Hall</option>
              <option value="Girton Hall">Girton Hall</option>
              <option value="Reith Hall">Reith Hall</option>
            </select>

            <button className="selectres-button" onClick={handleGoClick} disabled={!selectedResidence}>
              Go
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Card */}
      {showConfirmation && <RideNowConfirmation onClose={onClose} show_sub_message={false} />}
    </>
  );
};

export default SelectRes;
