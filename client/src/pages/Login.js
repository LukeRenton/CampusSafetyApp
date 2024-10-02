import React, { useEffect, useState, useContext } from 'react';
import { ReactComponent as Logo } from '../icons/Logo.svg';
import { UserContext } from '../contexts/UserContext';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const SignInPage = ( { set_user } ) => {
  //state to manage the visibility of the password
  const [showPassword, setShowPassword] = useState(false);
  //state to manage the student number
  const [studentNumber, setLocalStudentNumber] = useState('');
  //state to manage the password
  const [password, setPassword] = useState('');
  //state to manage the visibility of the login form
  const [show_login, set_show_login] = useState(false);

  const { setStudentNumber } = useContext(UserContext);

  const [error, set_error] = useState(null);

  const [loading, set_loading] = useState(false);

  const [remember_me, set_remember_me] = useState(false);

  //setting navigate 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (uname, pass) => {
    // API request to the backend
    set_loading(true);
    try {
      const response = await fetch('/users/login', { //add this onece we have merged with the backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: uname,
          password: pass,
        }),
      });

      if (response.status === 200) {
        setStudentNumber(uname);
        set_user(uname);
        set_loading(false);

        if (remember_me) {
          localStorage.setItem('user', JSON.stringify({
            username: uname,
            password: pass
          }))
        }

        // Redirect to the next page
        navigate('/main');
      } else if (response.status === 401) {
        set_user(null);
        set_error("Invalid credentials");
        set_loading(false);

      } else {
        set_user(null);
        set_error("Unexpected error. Please try again");
        set_loading(false);

      }
    } catch (error) {
      set_error("Erorr during login. Please make sure you are connected to the internet and try again");
      set_user(null);
      set_loading(false);

    }
  };

  const try_get_remembered_user = async () => {
    const user = localStorage.getItem('user');
    if (user) {
      const info = JSON.parse(user);
      setLocalStudentNumber(info.username);
      setPassword(info.password);
      handleLogin(info.username, info.password);
    }
  }

  useEffect(() => {
    set_show_login(true);
    try_get_remembered_user();
  }, []);

  

  return (
    <div className="login-container">
      <div className="header">
        <Logo className="logo" />
        <h1 className="signInText">Sign In</h1>
      </div>

      <div className={`formContainer ${show_login ? 'formContainer-show': '' }`}>
        <div className={`formSubContainer`}>

          <h2 className="title">Welcome to Campus Safety App</h2>
          <p className="subtitle">
            To login, use your Wits student number and your student password
          </p>

          <input
            type="text"
            placeholder="Student Number"
            className="inputField"
            value={studentNumber}
            onChange={(e) => setLocalStudentNumber(e.target.value)}
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
              <input type="checkbox" onChange={(e) => set_remember_me(!remember_me)}/>
              Remember me?
            </label>
          </div>

          {
          error?
          <div className='login-errorContainer'>
            <h3 className='login-error-message'>{`An error has occurred: ${error}`}</h3>
          </div>
          :
          <></>
          }

          <button className="signInButton" onClick={() => handleLogin(studentNumber, password)}>
            {
            loading ?
            <Loader size={40}></Loader>
            :
            'Sign In'
            }
          </button>

          <div className='login-scroll-base'> .</div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
