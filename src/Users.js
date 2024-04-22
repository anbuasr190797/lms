import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]); // Initialize users state variable with an empty array [] as default value
    const [user, setUser] = useState([]); // Initialize user state variable with an empty object {} as default value
    const navigate = useNavigate(); // Initialize navigate variable with the useNavigate() hook

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
    
        const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
        document.cookie = `${name}=${cookieValue}; path=/`;
    }

    useEffect(()=>{
        setUsers(JSON.parse(getCookie('users')));
        setUser(JSON.parse(getCookie('currentUser')));
    },[])

    const makeAdmin = (user) => { 
        user.isAdmin = true;
        setCookie('users', JSON.stringify(users), 1);
        setUsers(JSON.parse(getCookie('users')));
    }

    const makeNormalUser = (user) => { 
        user.isAdmin = false;
        setCookie('users', JSON.stringify(users), 1);
        setUsers(JSON.parse(getCookie('users')));
    }

    const createUser = () => {
        const username = prompt("Enter username");

        var chk = 0;
        users.map(user=>{
            if(user.username===username){
                alert('Username already taken');
                chk = 1;
                return false;
            }
        })

        
        if(chk===0){
        const password = prompt("Enter password");
        const confirmPassword = prompt("Confirm password");
        if(username.length>0 && password.length>0 && password === confirmPassword && users.map(user=>{return user.username!==username})!==false)  {
        const newUser = {
            username: username,
            password: password,
            isAdmin: false,
            borrowedBooks: []
        }
        users.push(newUser);
        setCookie('users', JSON.stringify(users), 1);
        setUsers(JSON.parse(getCookie('users')));
        }
        else{
            alert('Passwords do not match');
        }
        }
    }

    return (
        <div>
        {user[0]?.isAdmin?(
            <div className="container mt-5">
            <h1 className="text-center text-light">All Users</h1>
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
            <thead className="thead-dark">
            <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Is Admin</th>
            <th>Admin status</th>
            <th>Delete User</th>
            <th>Borrowed Books</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user?.isAdmin?"true":"false"}</td>
                    {!user?.isAdmin?(<td><button onClick={()=>{makeAdmin(user)}}>Make Admin</button></td>):
                        (<td>
                            <button onClick={()=>{makeNormalUser(user)}}>
                                Make User
                            </button>
                        </td>)
                    }
                    <td><button onClick={()=>{
                        users.splice(index,1);
                        setCookie('users', JSON.stringify(users), 1);
                        setUsers(JSON.parse(getCookie('users')))
                        }
                        }>Delete User</button></td>
                    <td><button onClick={()=>{navigate('/borrowedBooks',{state:user.borrowedBooks})}}>View</button></td>
                </tr>
              ))}
              <tr>
                <td>
                    <button onClick={()=>{createUser()}}>Add User</button>
                </td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>):(
                  <div>You are not authorized to be here</div>
        )}
        </div>
    )
};
