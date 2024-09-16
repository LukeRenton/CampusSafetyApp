import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import addNotification from 'react-push-notification'; //*

function App() {
  const [hasNotified, setHasNotified] = useState(false); // State to track if notification is sent


  useEffect(() => {
    // Create an EventSource connection to listen to server-sent events
    const eventSource = new EventSource('http://localhost:5000/alerts/pushalerts');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //const message = JSON.parse(data.message);
      if (!hasNotified) {

        console.log(data.message);
        // Trigger the notification using react-push-notification
        const desc = data.message.desc;
        addNotification({
          title: 'Campus Safety',
          message: desc,
          duration: 5000,
          icon: logo,
          native: true,
        });
        setHasNotified(true);
      }
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [hasNotified]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
