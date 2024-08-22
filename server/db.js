// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si usas otro host
  user: 'root', // Tu usuario de MySQL
  password: '29595', // Tu contraseña de MySQL
  database: 'injupen_db' // Nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;
