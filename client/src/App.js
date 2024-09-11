import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () =>
{
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}/>  
          </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
