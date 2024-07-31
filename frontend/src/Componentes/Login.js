import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logoSIAC from './imagenes/Logo siac.png';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para el mensaje de error

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        username: username,
        password: password,
        ldap: 0, // Asumiendo que no se usa LDAP por defecto
      });
      const data = response.data;
      if (data.access) {
        onLoginSuccess(data);
      } else {
        setErrorMessage('Autenticación fallida');
      }
    } catch (error) {
      console.error('Hubo un error con el login', error);
      setErrorMessage('Hubo un error con el login');
    }
  };

  return (
    <div className="login-container">
      <img src={logoSIAC} alt="Logo SIAC" className="login-logo" />
      <form onSubmit={handleLoginSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar mensaje de error si existe */}
    </div>
  );
};

export default Login;
