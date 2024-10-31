// client/src/components/BookList.js
import React from 'react';

const BookList = ({ books, onDelete, onEdit }) => (
  <ul className="list-group">
    {books.map((book) => (
      <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <strong>{book.title}</strong> - {book.author} - ${book.price}
        </span>
        <div>
          <button onClick={() => onEdit(book)} className="btn btn-info btn-sm me-2">Editar</button>
          <button onClick={() => onDelete(book.id)} className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
    ))}
  </ul>
);

export default BookList;
