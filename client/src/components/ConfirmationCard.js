/**
 * File: ConfirmationCard.js
 * 
 * Author: Anand
 * 
 * Description:
 *  Confirmation display for when user has signed up for ride home
 */


import React from 'react';
import '../styles/ConfirmationCard.css'; // Use updated ConfirmationCard CSS

const ConfirmationCard = ({ className }) => {
  return (
    <div className="confirmation-overlay">
      <div className={`confirmation-content ${className}`}>
        <h1 className="confirmation-heading">You're all set!</h1>
      </div>
    </div>
  );
};

export default ConfirmationCard;
