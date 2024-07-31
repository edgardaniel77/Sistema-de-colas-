import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Componentes/Sidebar';
import Inicio from './Componentes/Paginas/Inicio';
import Llamadas from './Componentes/Paginas/Llamadas';
import SalaEspera from './Componentes/Paginas/SalaEspera';
import GestionUsuarios from './Componentes/Paginas/GestionUsuarios';
import Turnos from './Componentes/Paginas/Turnos';
import Informes from './Componentes/Paginas/Reportes';
import Seguridad from './Componentes/Paginas/Seguridad';
import Configuraciones from './Componentes/Paginas/Configuraciones';
import Login from './Componentes/Login';
import Display from './Componentes/Paginas/Display';
import UsuariosGrid from './Componentes/Paginas/UsuariosGrid'; // Asegúrate de importar UsuariosGrid
import { TicketProvider } from './Componentes/Paginas/TicketContext'; // Importa el TicketProvider

import './App.css';

const AppContent = ({ isLoggedIn, handleLoginSuccess, handleLogout, toggleSidebar, isSidebarCollapsed, usuarios, actualizarUsuarios }) => {
  const location = useLocation();
  const showSidebar = !['/display', '/sala-espera'].includes(location.pathname);

  return (
    <div className={`container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {isLoggedIn && (
        <Sidebar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          toggleSidebar={toggleSidebar}
          isCollapsed={isSidebarCollapsed}
          showSidebar={showSidebar}
        />
      )}
      <main className="main-content">
        <Routes>
          {!isLoggedIn ? (
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          ) : (
            <>
              <Route path="/" element={<Inicio />} />
              <Route path="/display" element={<Display />} />
              <Route path="/sala-espera" element={<SalaEspera />} />
              <Route path="/llamadas" element={<Llamadas />} />
              <Route path="/turnos" element={<Turnos />} />
              <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
              <Route path="/usuarios-grid" element={<UsuariosGrid usuarios={usuarios} />} /> 
              <Route path="/informes" element={<Informes />} />
              <Route path="/seguridad" element={<Seguridad />} />
              <Route path="/configuraciones" element={<Configuraciones />} />
            </>
          )}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [usuarios, setUsuarios] = useState([]); // Define usuarios como estado

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Ejemplo de cómo podrías actualizar `usuarios`
  const actualizarUsuarios = (nuevosUsuarios) => {
    setUsuarios(nuevosUsuarios);
  };

  return (
    <TicketProvider> {/* Envolver la aplicación con TicketProvider */}
      <Router>
        <AppContent
          isLoggedIn={isLoggedIn}
          handleLoginSuccess={handleLoginSuccess} // Asegúrate de pasar esta prop
          handleLogout={handleLogout}
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          usuarios={usuarios}
          actualizarUsuarios={actualizarUsuarios}
        />
      </Router>
    </TicketProvider>
  );
}

export default App;
