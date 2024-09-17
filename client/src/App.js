import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import LoginPage from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () =>
{
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/main" element={<Main />}/>  
            <Route path="/" element={<LoginPage />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
