import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../icons/Logo.svg';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  //state to manage the visibility of the password
  const [showPassword, setShowPassword] = useState(false);
  //state to manage the student number
  const [studentNumber, setStudentNumber] = useState('');
  //state to manage the password
  const [password, setPassword] = useState('');
  //state to manage the visibility of the login form
  const [show_login, set_show_login] = useState(false);

  //setting navigate 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    set_show_login(true);
  }, []);

  const handleLogin = async () => {
    // API request to the backend
    try {
      const response = await fetch('/users/login', { //add this onece we have merged with the backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: studentNumber,
          password: password,
        }),
      });

      if (response.status === 200) {
        console.log('Login successful!');
        // Redirect to the next page
        navigate('/main');
      } else if (response.status === 401) {
        console.log('Invalid credentials');
      } else {
        console.log('Unexpected error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <Logo className="logo" />
        <h1 className="signInText">Sign In</h1>
      </div>

      <div className={`formContainer ${show_login ? 'formContainer-show': '' }`}>
        <h2 className="title">Welcome to Campus Safety App</h2>
        <p className="subtitle">
          To login, use your Wits student number and your student password
        </p>

        <input
          type="text"
          placeholder="Student Number"
          className="inputField"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <div className="passwordContainer">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="inputField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={togglePasswordVisibility} className="eyeIcon">
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="optionsContainer">
          <label>
            <input type="checkbox" />
            Remember me?
          </label>
          <a href="#" className="forgotPasswordLink">
            Forgot password?
          </a>
        </div>

        <button className="signInButton" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
