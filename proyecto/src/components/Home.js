import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  return (
    <div className="home">
      <h1>Bienvenido a LibroHub</h1>
      <p>Explora y compra tus libros favoritos.</p>
      <h2>Libros Disponibles</h2>
      <ul className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="book-item">
              <p><strong>{book.titulo}</strong></p>
              <p>Autor: {book.autor}</p>
              <p>Precio: ${Number(book.precio).toFixed(2)}</p>
            </li>
          ))
        ) : (
          <p>No hay libros disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;