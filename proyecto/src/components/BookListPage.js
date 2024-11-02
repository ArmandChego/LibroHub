import React from 'react';
import './styles/BookListPage.css';

const BookListPage = ({ books, onDelete, onEdit }) => {
  console.log("Books:", books);

  if (!books || books.length === 0) {
    return <p>No hay libros disponibles para mostrar.</p>;
  }

  return (
    <div className="book-list-page">
      <h2 className="page-title">Lista de Libros</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-info">
              <p className="book-title">{book.titulo}</p>
              <p className="book-author">por {book.autor}</p>
              <p className="book-price">
                ${Number(book.precio).toFixed(2)} {}
              </p>
            </div>
            <div className="book-buttons">
              <button onClick={() => onEdit(book)} className="btn btn-edit">Editar</button>
              <button onClick={() => onDelete(book.id)} className="btn btn-delete">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookListPage;
