import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/BookItem.css';


const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="book-list-container">
      <h1>Lista de Libros</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-info">
              <strong>{book.titulo}</strong> - {book.autor} - ${book.precio}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
