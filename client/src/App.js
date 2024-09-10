import React, { useState } from 'react';
import PopupCard from './components/PopupCard'; 
import './styles/App.css';

const App = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="phone-screen">
      <button className="centered-button" onClick={() => setPopupOpen(true)}>
        Show Popup
      </button>

      {/* The PopupCard will only appear when popupOpen is true */}
      <PopupCard isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default App;
