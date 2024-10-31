import React from 'react';

const BookItem = ({ book, onDelete, onEdit }) => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    <span><strong>{book.title}</strong> - {book.author} - ${book.price}</span>
    <div>
      <button onClick={onEdit} className="btn btn-info btn-sm me-2">Editar</button>
      <button onClick={onDelete} className="btn btn-danger btn-sm">Eliminar</button>
    </div>
  </li>
);

export default BookItem;
