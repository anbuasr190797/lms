import React ,{useEffect, useState}from "react";
import { useLocation } from "react-router-dom";

export default function BorrowedBooks() {
    const location = useLocation();
    const borrowedBooks = location.state;
    console.log(borrowedBooks);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-light">Borrowed Books</h1>
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowedBooks.map((book) => (
                        <tr key={book.BookId}>
                            <td>{book.BookId}</td>
                            <td>{new Date(book.BorrowDate).toLocaleString()}</td>
                            <td>{new Date(book.ReturnDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}