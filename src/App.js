import React from "react";
import './App.css';
import RoutePages from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
  }
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(item => item.trim());

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null; 
  }
  if(!getCookie('users'))
    setCookie('users','[]',1)

  return (
    <div className="App">
      <Router>
        <RoutePages/>
      </Router>
    </div>
  );
}


export default App;
