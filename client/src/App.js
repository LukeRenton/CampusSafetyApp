import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
export default App;
