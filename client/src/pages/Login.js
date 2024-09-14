// Login page component
import React from 'react';
import logo from "../media/logo.jpeg"
import '../styles/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-icon">
        <img src={logo} alt="App Icon" /> 
      </div>
      <div className="login-form">
        <div className="input-container">
          <svg className="input-icon" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <input type="text" className="login-input" placeholder="Username" />
        </div>
        <div className="input-container">
          <svg className="input-icon" viewBox="0 0 24 24">
            <path d="M12 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8V7c0-3.31-2.69-6-6-6S6 3.69 6 7v2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-6-5c1.66 0 3 1.34 3 3v2H9V7c0-1.66 1.34-3 3-3z" />
          </svg>
          <input type="password" className="login-input" placeholder="Password" />
        </div>
        <button className="login-button">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
