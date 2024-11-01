// src/components/CompraLibros.js
import React from 'react';

const CompraLibros = ({ books, onPurchase }) => {
  return (
    <div className="compra-libros">
      <h2>Comprar Libros</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="book-item">
            <p><strong>{book.titulo}</strong></p>
            <p>Autor: {book.autor}</p>
            <p>Precio: ${Number(book.precio).toFixed(2)}</p>
            <button onClick={() => onPurchase(book)}>Comprar</button>
          </div>
        ))
      ) : (
        <p>No hay libros disponibles para comprar.</p>
      )}
    </div>
  );
};

export default CompraLibros;
