const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '29595',
  database: 'injupen_db',
  port: 3306,
};

const pool = mysql.createPool(dbConfig);

// Crear usuario
app.post('/usuarios', (req, res) => {
  const { nombre, identificacion, correo, telefono, password, rol, area } = req.body;
  const sql = 'CALL CrearUsuario(?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [nombre, identificacion, correo, telefono, password, rol, area], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Usuario creado' });
  });
});

// Leer usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'CALL LeerUsuarios()';
  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results[0]);
  });
});

// Actualizar usuario
app.put('/usuarios/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { nombre, identificacion, correo, telefono, password, rol, area } = req.body;
  const sql = 'CALL ActualizarUsuario(?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [codigo, nombre, identificacion, correo, telefono, password, rol, area], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Usuario actualizado' });
  });
});

// Eliminar usuario
app.delete('/usuarios/:codigo', (req, res) => {
  const { codigo } = req.params;
  const sql = 'CALL EliminarUsuario(?)';
  pool.query(sql, [codigo], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
