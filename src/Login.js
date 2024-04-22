import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(item => item.trim());

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null; // Return null if cookie with given name is not found
}

const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = encodeURIComponent(JSON.stringify(value)) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
  document.cookie = `${name}=${cookieValue}; path=/`;
}

const handleSubmit = (e) => {
      const users = JSON.parse(getCookie('users'));
      for (let user of users) {
          if (user.username === username) {
            if(password === user.password){
              setCookie('currentUser', [{"username":username,"password":password,"borrowedBooks":user.borrowedBooks,"isAdmin":user.isAdmin}], 1);
              navigate('/dashboard');
              e.preventDefault();
              return;
            }
            else{
              alert('Password is incorrect');
              e.preventDefault();
              return;
            }
          }
          
      }
      alert('Username does not exist');
      e.preventDefault();
}

  return (
    <div className="container py-4">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h2 className="text-center mb-4" style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}>Library Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3" style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
