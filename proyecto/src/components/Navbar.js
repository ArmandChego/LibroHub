import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>LibroHub</h1>
    <div className="navbar-links">
      <Link to="/">Inicio</Link>
      <Link to="/lista">Lista de Libros</Link>
      <Link to="/agregar">Agregar Libro</Link>
      <Link to="/comprar">Comprar Libros</Link>
    </div>
  </nav>
);

export default Navbar;
