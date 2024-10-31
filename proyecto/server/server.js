// server/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Configuración de CORS para permitir solicitudes desde localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Coloca el usuario de MySQL
  password: 'pokemon22', // Coloca la contraseña de MySQL
  database: 'librohub'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Rutas CRUD
// Obtener todos los libros
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Error fetching books' });
    } else {
      res.json(results);
    }
  });
});

// Agregar un nuevo libro
app.post('/books', (req, res) => {
  const { title, author, price } = req.body;
  db.query('INSERT INTO books (title, author, price) VALUES (?, ?, ?)', [title, author, price], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ error: 'Error adding book' });
    } else {
      res.json({ id: result.insertId, title, author, price });
    }
  });
});

// Actualizar un libro
app.put('/books/:id', (req, res) => {
  const { title, author, price } = req.body;
  const { id } = req.params;
  db.query('UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?', [title, author, price, id], (err) => {
    if (err) {
      console.error('Error updating book:', err);
      res.status(500).json({ error: 'Error updating book' });
    } else {
      res.json({ id, title, author, price });
    }
  });
});

// Eliminar un libro
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ error: 'Error deleting book' });
    } else {
      res.json({ message: 'Book deleted' });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
