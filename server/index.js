// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: '29595', // Reemplaza con tu contraseña de MySQL
  database: 'injupen_db' // Reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1); // Detiene el servidor si no se puede conectar a la base de datos
  }
  console.log('Conectado a la base de datos');
});

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());



// Endpoint para crear un nuevo ticket
app.post('/tickets', (req, res) => {
  const { ID_CLIENTE, TICKET, TIPO_ATENCION, SERVICIO, FECHA, HORA } = req.body;

  if (!ID_CLIENTE || !TICKET || !TIPO_ATENCION || !SERVICIO || !FECHA || !HORA) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  const sql = 'INSERT INTO ticket_clientes (ID_CLIENTE, TICKET, TIPO_ATENCION, SERVICIO, FECHA, HORA) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(sql, [ID_CLIENTE, TICKET, TIPO_ATENCION, SERVICIO, FECHA, HORA], (err, result) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Resultado de la inserción:', result);
    res.status(201).json({ message: 'Ticket creado con éxito', ticketId: result.insertId });
  });
});



// Endpoint para obtener todos los tickets (si es necesario)
app.get('/tickets', (req, res) => {
  connection.query('SELECT * FROM tickets', (err, results) => {
    if (err) {
      console.error('Error al obtener los tickets:', err); // Imprime el error SQL en la consola
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Endpoint para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { NOMBRE, IDENTIFICACION, CORREO, TELEFONO, PASSWORD, ROL, AREA } = req.body;

  if (!NOMBRE || !IDENTIFICACION || !CORREO || !TELEFONO || !PASSWORD || !ROL || !AREA) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  const sql = 'INSERT INTO gestion_usuarios (NOMBRE, IDENTIFICACION, CORREO, TELEFONO, PASSWORD, ROL, AREA) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(sql, [NOMBRE, IDENTIFICACION, CORREO, TELEFONO, PASSWORD, ROL, AREA], (err, result) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario creado con éxito', usuarioId: result.insertId });
  });
});

// Endpoint para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM gestion_usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});
// Endpoint para actualizar un usuario existente
app.put('/usuarios/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { NOMBRE, IDENTIFICACION, CORREO, TELEFONO, PASSWORD, ROL, AREA } = req.body;

  if (!NOMBRE || !IDENTIFICACION || !CORREO || !TELEFONO || !PASSWORD || !ROL || !AREA) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  const sql = 'UPDATE gestion_usuarios SET NOMBRE = ?, IDENTIFICACION = ?, CORREO = ?, TELEFONO = ?, PASSWORD = ?, ROL = ?, AREA = ? WHERE CODIGO = ?';

  connection.query(sql, [NOMBRE, IDENTIFICACION, CORREO, TELEFONO, PASSWORD, ROL, AREA, codigo], (err, result) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  });
});
// Endpoint para eliminar un usuario
app.delete('/usuarios/:codigo', (req, res) => {
  const { codigo } = req.params;

  const sql = 'DELETE FROM gestion_usuarios WHERE CODIGO = ?';

  connection.query(sql, [codigo], (err, result) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
