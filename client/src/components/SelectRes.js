import React from 'react';
import '../styles/PopupCard.css'; // Reuse popup styles

const SelectRes = ({ isOpen, onClose }) => {
  const handleSelect = (event) => {
    console.log("Selected Residence:", event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="Card1-Heading">Select Residence</h1>
        <h6 className="Card1-subheading">Choose your residence from the list</h6>

        <select className="Card1-Button" onChange={handleSelect}>
          <option value="residence1">Residence 1</option>
          <option value="residence2">Residence 2</option>
          <option value="residence3">Residence 3</option>
        </select>

        <button className="Card1-Button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SelectRes;

