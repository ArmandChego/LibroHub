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

app.post('/books', (req, res) => {
  const { titulo, autor, precio } = req.body;
  db.query('INSERT INTO books (titulo, autor, precio) VALUES (?, ?, ?)', [titulo, autor, precio], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ error: 'Error adding book' });
    } else {
      res.json({ id: result.insertId, titulo, autor, precio });
    }
  });
});

app.put('/books/:id', (req, res) => {
  const { titulo, autor, precio } = req.body;
  const { id } = req.params;
  db.query('UPDATE books SET titulo = ?, autor = ?, precio = ? WHERE id = ?', [titulo, autor, precio, id], (err) => {
    if (err) {
      console.error('Error updating book:', err);
      res.status(500).json({ error: 'Error updating book' });
    } else {
      res.json({ id, titulo, autor, precio });
    }
  });
});

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
