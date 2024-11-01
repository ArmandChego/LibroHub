// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ onAddOrUpdate, editingBook }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitulo(editingBook.titulo);
      setAutor(editingBook.autor);
      setPrecio(editingBook.precio);
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrUpdate({ titulo, autor, precio });
    setTitulo('');
    setAutor('');
    setPrecio('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Autor"
        className="form-control mb-2"
        required
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
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
