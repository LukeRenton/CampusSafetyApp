import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

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
