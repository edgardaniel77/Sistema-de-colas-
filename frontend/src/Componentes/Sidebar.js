import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUsers, faCalendarAlt, faFileAlt, faShieldAlt, faTools, faPhone, faUserCog, faTv, faSignOutAlt, faBars
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn, handleLogout, toggleSidebar, isCollapsed }) => {
  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
        {!isCollapsed && <span>INJUPEMP</span>}
      </div>
      <ul className="nav-group">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="active">
            <FontAwesomeIcon icon={faHome} /> {!isCollapsed && 'Inicio'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/display" activeClassName="active">
            <FontAwesomeIcon icon={faTv} /> {!isCollapsed && 'Display'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sala-espera" activeClassName="active">
            <FontAwesomeIcon icon={faUsers} /> {!isCollapsed && 'Sala de Espera'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/llamadas" activeClassName="active">
            <FontAwesomeIcon icon={faPhone} /> {!isCollapsed && 'Llamadas'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/gestion-usuarios" activeClassName="active">
            <FontAwesomeIcon icon={faUserCog} /> {!isCollapsed && 'Gestión de Usuarios'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/turnos" activeClassName="active">
            <FontAwesomeIcon icon={faCalendarAlt} /> {!isCollapsed && 'Turnos'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/informes" activeClassName="active">
            <FontAwesomeIcon icon={faFileAlt} /> {!isCollapsed && 'Reportes'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/seguridad" activeClassName="active">
            <FontAwesomeIcon icon={faShieldAlt} /> {!isCollapsed && 'Seguridad'}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/configuraciones" activeClassName="active">
            <FontAwesomeIcon icon={faTools} /> {!isCollapsed && 'Configuraciones'}
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="nav-item logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> {!isCollapsed && 'Cerrar Sesión'}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
