import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

/**
 * Thank you to the following sites and providers for their icons and animations:
 * 
 * CC links
 *  LordIcon : https://lordicon.com/ (for SVG icons and Lottie animations)
 *  SVGRepo: https://www.svgrepo.com/ (for SVG icons)
 *  SVGator: https://app.svgator.com/ (for SVG editing platform)
 * 
 */

const App = () => {

  const [user, set_user] = useState(null);
  
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<Main user={user} set_user={set_user} />} />
            <Route path="/" element={<LoginPage set_user={set_user}  />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
export default App;
