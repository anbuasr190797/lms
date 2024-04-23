import React, { useEffect, useState } from 'react';
// import {createBook,getBooks,updateBookAuthor,updateBookAvailability,updateBookName,updateBookPublisher,deleteBook} from './LambdaDB';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {getCookie,setCookie} from "lms-lib";


function Dashboard() {
  const [books, setBooks] = useState([]);
  const [user,setUser] = useState([]);
  const [users,setUsers] = useState([]);

  const imageUrls = [
    "https://lmsbookspic.s3.amazonaws.com/book1.jpg",
    "https://lmsbookspic.s3.amazonaws.com/book2.jpg",
    "https://lmsbookspic.s3.amazonaws.com/book3.jpg",
    "https://lmsbookspic.s3.amazonaws.com/book4.jpg",
    "https://lmsbookspic.s3.amazonaws.com/book5.jpg"
  ];

//   const getCookie = (name) => {
//     const cookieString = document.cookie;
//     const cookies = cookieString.split(';');

//     for (let cookie of cookies) {
//         const [cookieName, cookieValue] = cookie.split('=').map(item => item.trim());

//         if (cookieName === name) {
//             return decodeURIComponent(cookieValue);
//         }
//     }

//     return null; // Return null if cookie with given name is not found
// }
// const setCookie = (name, value, days) => {
//   const expirationDate = new Date();
//   expirationDate.setDate(expirationDate.getDate() + days);

//   const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
//   document.cookie = `${name}=${cookieValue}; path=/`;
// }


      
      const navigate = useNavigate();
      useEffect(() => {

        const fetchBooks = async () => {
          try {
        const response = await axios.get('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/getBooks');
        setUser(JSON.parse(getCookie('currentUser')));
        setBooks(response.data.Items);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };  
    setUsers(JSON.parse(getCookie('users')));
    fetchBooks();
    }, []);

  const borrowBook = async (book) => { 
    const borrowDate = new Date().toISOString();
    const returnDate = "Yet to return";
    const data = book;
    data.Available = false;
    try {
      const response = await fetch('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/updateBookAvailabilityStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      try {
        const response = await axios.put('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/updateBookAvailabilityStatus', data);
        if (response.status === 200) {
          alert('Book borrowed successfully');
          // console.log(user[0]);
          user[0].borrowedBooks.push({BookId: book.BookId, BorrowDate: borrowDate, ReturnDate: returnDate});
          users.map(usert=>{
            if(usert.username===user[0].username){
              usert.borrowedBooks.push({BookId: book.BookId, BorrowDate: borrowDate, ReturnDate: returnDate});
            }
          })
          setCookie('users', JSON.stringify(users), 1);
          setCookie('currentUser', JSON.stringify(user), 1);
          axios.get('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/getBooks').then((response) => {
            setBooks(response.data.Items);
          });
          // updateBookAvailabilityAdmin({BookId: book.BookId, Available: false});
        } else {
          throw new Error('Failed to borrow book');
        }
      } catch (error) {
        console.error('Error borrowing book:', error);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const returnBook = async (book) => {
    const returnDate = new Date().toISOString();
    const data = book;
    // console.log(data);
    data.Available = true;
    try {
      const response = await fetch('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/updateBookAvailabilityStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        alert('Book returned successfully');
        
        axios.get('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/getBooks').then((response) => {
          setBooks(response.data.Items);
        });
          
        user[0].borrowedBooks = user[0].borrowedBooks.map((borrowedBook) => {
          if (borrowedBook.BookId === book.BookId) {
            borrowedBook.ReturnDate = returnDate;
          }
          return borrowedBook;
        });

        setCookie('currentUser', JSON.stringify(user), 1);

        users.map(user=>{
          user.borrowedBooks = user.borrowedBooks.map((borrowedBook) => {
            if (borrowedBook.BookId === book.BookId) {
              borrowedBook.ReturnDate = returnDate;
            }
            return borrowedBook;
          });
        })
        setCookie('users', JSON.stringify(users), 1);
        // updateBookAvailabilityAdmin({BookId: book.BookId, Available: true});
      } else {
        throw new Error('Failed to return book');
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleNavigation = () => { 
    navigate("/addbook")
  };

  const deleteBook = async (book) => {
    try {
      const response = await fetch('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/deleteBook', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (response.status === 200) {
        alert('Book deleted successfully');
        axios.get('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/getBooks').then((response) => {
          setBooks(response.data.Items);
        });
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleClick = () => {
    navigate('/users');
  }

  return (
    <div className="container">
      
      <h1 className="mt-5 mb-4 text-center" style={{color:'snow'}}> Welcome to NCI Library </h1>
      
        <div className="d-flex justify-content-between m-3">
        {user[0]?.isAdmin && (
        <button className="btn btn-dark" onClick={handleClick}>Users List</button>)}
        <button className="btn btn-dark" onClick={handleNavigation}>{user[0]?.isAdmin?"Add Books":"Donate Books"}</button>

        </div>
      <div className="row" style={{ overflowY: 'scroll', maxHeight: '500px'}}>
        {books.map((book, index) => (
          <div className="col-md-4 mb-4" key={index} style={{ height: '400px' }}>
          <div className="card border-dark" style={{ backgroundImage: `url(${imageUrls[index % imageUrls.length]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100%' }}>
            <div className="card-body d-flex flex-column justify-content-end" style={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
              <h2 className="card-title text-dark">{book.BookName}</h2>
              <p className="card-text text-dark">by {book.BookAuthor}</p>
              {book.Available ? (
                <button className="btn btn-secondary mt-auto" onClick={() => borrowBook(book)}>Borrow</button>
              ) : (
                <button className="btn btn-secondary mt-auto" onClick={() => returnBook(book)}>Return</button>
              )}
              {user[0]?.isAdmin && (
                <button className="btn btn-primary mt-2" onClick={() => deleteBook(book)}>Delete</button>
              )}
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

  // const updateBookAvailabilityAdmin = async (data) => {
    //   try {
      //     const response = await fetch('http://lms-server-env.eba-uhgycy4i.us-east-1.elasticbeanstalk.com/updateBookAvailabilityStatus', {
        //       method: 'POST',
        //       headers: {
          //         'Content-Type': 'application/json',
          //       },
          //       body: JSON.stringify(data),
          //     });
          //     if (response.status === 200) {
            //       alert('Book availability updated successfully');
            //       getBooks().then((response) => {
  //         setBooks(response.Items);
  //       });
  //     } else {
    //       throw new Error('Failed to update book availability');
    //     }
    //   } catch (error) {
      //     console.error('Error updating book availability:', error);
      //   }
      // };