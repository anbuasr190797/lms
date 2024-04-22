import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Addbook from './Addbook';
// import BorrowReturnBooks from './BorrowReturnBooks';
import AdminSignUp from './adminSignUp';
import Users from './Users';
import BorrowedBooks from './BorrowedBooks';

const RoutePages = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Signup/>} />
            <Route exact path="/adminSignUp" element={<AdminSignUp/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/addbook" element={<Addbook/>} />
            <Route exact path="/users" element={<Users/>} />
            <Route exact path="/borrowedBooks" element={<BorrowedBooks/>} />
            {/* <Route exact path="/borrow-return-books" component={BorrowReturnBooks} /> */}
        </Routes>
    );
};

export default RoutePages;