// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BookListPage from './components/BookListPage';
import AddBook from './components/AddBook';
import CompraLibros from './components/CompraLibros';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // Estado para manejar el libro que se está editando

  // Cargar libros al iniciar la aplicación
  useEffect(() => {
    fetchBooks();
  }, []);

  // Función para obtener todos los libros desde el servidor
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Función para agregar un nuevo libro
  const handleAddBook = async (newBook) => {
    try {
      const response = await axios.post('http://localhost:5000/books', newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Función para eliminar un libro
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Función para actualizar un libro existente
  const handleEditBook = async (updatedBook) => {
    try {
      const response = await axios.put(`http://localhost:5000/books/${updatedBook.id}`, updatedBook);
      setBooks(books.map((book) => (book.id === updatedBook.id ? response.data : book)));
      setEditingBook(null); // Restablecer el estado después de editar
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Función para manejar la compra de un libro
  const handlePurchaseBook = (book) => {
    alert(`Libro comprado: ${book.titulo}`);
    // Aquí puedes agregar lógica adicional para registrar la compra
  };

  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Aquí usamos el componente Navbar */}
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route
            path="/lista"
            element={
              <BookListPage
                books={books}
                onEdit={(book) => setEditingBook(book)} // Pasamos el libro a editar
                onDelete={handleDeleteBook}
              />
            }
          />
          <Route
            path="/agregar"
            element={
              <AddBook
                onAdd={handleAddBook}
                editingBook={editingBook} // Pasamos el libro que se está editando
                setEditingBook={setEditingBook} // Pasamos la función para cambiar el estado
                onEditComplete={handleEditBook} // Para completar la edición
              />
            }
          />
          <Route path="/comprar" element={<CompraLibros books={books} onPurchase={handlePurchaseBook} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
