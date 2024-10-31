// client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Función para obtener todos los libros
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  

  // Función para agregar o actualizar un libro
  const handleAddOrUpdateBook = async (book) => {
    if (editingBook) {
      const response = await axios.put(`http://localhost:5000/books/${editingBook.id}`, book);
      const updatedBooks = books.map((b) =>
        b.id === editingBook.id ? response.data : b
      );
      setBooks(updatedBooks);
      setEditingBook(null);
    } else {
      const response = await axios.post('http://localhost:5000/books', book);
      setBooks([...books, response.data]);
    }
  };

  // Función para eliminar un libro
  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">LibroHub - Gestión de Libros</h1>
      <BookForm onAddOrUpdate={handleAddOrUpdateBook} editingBook={editingBook} />
      <BookList books={books} onDelete={handleDeleteBook} onEdit={setEditingBook} />
    </div>
  );
};

export default App;
