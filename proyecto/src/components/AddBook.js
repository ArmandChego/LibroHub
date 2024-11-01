// src/components/AddBook.js
import React, { useState, useEffect } from 'react';

function AddBook({ onAdd, editingBook, setEditingBook }) {
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
    onAdd({ titulo, autor, precio });
    setTitulo('');
    setAutor('');
    setPrecio('');
    setEditingBook(null);
  };

  return (
    <div className="add-book-form">
      <h2>{editingBook ? 'Editar Libro' : 'Agregar Libro'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" required />
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" required />
        <button type="submit">{editingBook ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
}

export default AddBook;
