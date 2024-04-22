import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addbook() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        BookName: "",
        BookAuthor: "",
        BookPublisher: "",
        Available: true,
        BookId: ""
    });

    useEffect(() => {  
        const fetchBookId = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getBooks');
                const bookId = parseInt((response.data.Items.sort((a, b) => b.BookId.localeCompare(a.BookId)))[0].BookId) + 1;
                setData(prevData => ({...prevData, BookId: bookId.toString()}));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBookId();
    }, []);


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = (e) => {
    //     fetch('http://localhost:3001/createBook', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             // Handle the response from the server
    //             handleCreate();
    //             console.log(result);
    //         })
    //         .catch(error => {
    //             // Handle any errors that occurred during the request
    //             console.error(error);
    //         });
    //     // Code to send form data to the server or perform any other action
    // };

    const handleSubmit =  async (e) => {
        try {
          const response = await fetch('http://localhost:3001/createBook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (response.status === 200) {
            alert('Book created successfully');
            navigate('/dashboard');
          } else {
            throw new Error('Failed to create book');
          }
        } catch (error) {
          console.error('Error creating book:', error);
        }
      };

    return (
        <div className="container mt-5" style={{color:"white"}}>
            <button className="btn" onClick={() => navigate('/dashboard')}>
                ◀
            </button>
            <h2 className='m-2'> Add Book</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="bookName" className="form-label">Book Name:</label>
                    <input type="text" className="form-control" id="bookName" name="BookName" value={data.BookName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="bookAuthor" className="form-label">Book Author:</label>
                    <input type="text" className="form-control" id="bookAuthor" name="BookAuthor" value={data.BookAuthor} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="bookPublisher" className="form-label">Book Publisher:</label>
                    <input type="text" className="form-control" id="bookPublisher" name="BookPublisher" value={data.BookPublisher} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
            <div className="mt-3">
                <p>Available: {data.Available ? "Yes" : "No"}</p>
                <p>Book ID: {data.BookId}</p>
            </div>
        </div>
    );
}

export default Addbook;