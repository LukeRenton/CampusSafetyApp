<<<<<<< HEAD
import React, { useState } from 'react';
import PopupCard from './components/PopupCard'; 
import './styles/App.css';

const App = () => {
  const [popupOpen, setPopupOpen] = useState(false);
=======
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
>>>>>>> cb8f514571721ba88887d29598e2d6876ea9bf35

  return (
<<<<<<< HEAD
    <div className="phone-screen">
      <button className="centered-button" onClick={() => setPopupOpen(true)}>
        Show Popup
      </button>

      {/* The PopupCard will only appear when popupOpen is true */}
      <PopupCard isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
=======
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}/>  
          </Routes>
      </BrowserRouter>
>>>>>>> cb8f514571721ba88887d29598e2d6876ea9bf35
    </div>
  );
};

export default App;
