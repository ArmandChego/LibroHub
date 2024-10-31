// client/src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ onAddOrUpdate, editingBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setPrice(editingBook.price);
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrUpdate({ title, author, price });
    setTitle('');
    setAuthor('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor"
        className="form-control mb-2"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio"
        className="form-control mb-2"
        required
      />
      <button type="submit" className="btn btn-primary btn-block">
        {editingBook ? 'Actualizar Libro' : 'Agregar Libro'}
      </button>
    </form>
  );
};

export default BookForm;
