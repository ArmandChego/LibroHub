import React, { useState } from 'react';
import axios from 'axios';
import './styles/BookItem.css';

const BookItem = ({ book, onDelete, onEdit }) => {
  const [cantidad, setCantidad] = useState(1);
  const [showCompraForm, setShowCompraForm] = useState(false);

  const handleCompra = async () => {
    try {
      await axios.post('http://localhost:5000/comprar', {
        book_id: book.id,
        cantidad,
      });
      alert('Compra realizada exitosamente');
      setShowCompraForm(false); // Ocultar el formulario después de la compra
    } catch (error) {
      console.error("Error realizando la compra:", error);
      alert('Error al realizar la compra');
    }
  };

  return (
    <li className="book-item">
      <div className="book-info">
        <div className="book-title">{book.titulo}</div>
        <div className="book-author">por {book.autor}</div>
        <div className="book-price">${book.precio}</div>
      </div>
      <div className="book-buttons">
        <button onClick={() => onEdit(book)} className="btn btn-info btn-sm">Editar</button>
        <button onClick={() => onDelete(book.id)} className="btn btn-danger btn-sm">Eliminar</button>
        <button onClick={() => setShowCompraForm(!showCompraForm)} className="btn btn-success btn-sm">Comprar</button>
      </div>

      {showCompraForm && (
        <div className="compra-form">
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad"
          />
          <button onClick={handleCompra}>
            Confirmar Compra
          </button>
        </div>
      )}
    </li>
  );
};

export default BookItem;
