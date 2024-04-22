import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignUp() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

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

    const handleSubmit = (e) => {
        
        if ((password === '' && confirmPassword === '' )|| password !== confirmPassword) {
            alert('Passwords do not match');
            e.preventDefault();
        } 
        else if (password === confirmPassword) {
            const users = JSON.parse(getCookie('users'));

            for (let user of users) {
                if (user.username === username) {
                    alert('Username already taken');
                    navigate('/adminSignUp');
                    e.preventDefault();
                    return;
                }
            }

            users.push({ username, password, borrowedBooks: [], isAdmin: true});
            setCookie('users', JSON.stringify(users));
            navigate('/login');
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4" style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}>Library Signup</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username" style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" style={{ fontFamily: 'Georgia, serif', color: '#8B4513' }}>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4" style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}>Signup</button>
                            </form>
                            <p className="btn btn-block mt-4 border-dark" onClick={handleLogin}>Login instead</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSignUp;
