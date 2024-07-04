import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'gridjs/dist/theme/mermaid.css';
import './GestionUsuarios.css';
import UsuariosGrid from './UsuariosGrid';

const CampoFormulario = ({ etiqueta, tipo, valor, onChange, opciones }) => (
  <label>
    {etiqueta}:
    {tipo === "select" ? (
      <select value={valor} onChange={onChange}>
        {opciones.map(opcion => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    ) : (
      <input type={tipo} value={valor} onChange={onChange} />
    )}
  </label>
);

const FormularioUsuario = ({ usuario, onSubmit, modoEdicion, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(usuario);
  };

  const roles = [
    { value: "administrador", label: "Administrador" },
    { value: "usuario", label: "Usuario" }
  ];

  const areas = [
    { value: "secretaria_general", label: "Secretaría General" },
    { value: "prestamos", label: "Préstamos" },
    { value: "cartera_y_cobro", label: "Cartera y Cobro" },
    { value: "planilla_jubilados", label: "Planilla Jubilados" },
    { value: "beneficios", label: "Beneficios" }
  ];

  return (
    <form onSubmit={handleSubmit} className="formulario-usuario">
      <CampoFormulario etiqueta="Nombre" tipo="text" valor={usuario.nombre} onChange={(e) => onChange(e, 'nombre')} />
      <CampoFormulario etiqueta="Identificación (13 dígitos)" tipo="text" valor={usuario.identificacion} onChange={(e) => onChange(e, 'identificacion')} />
      <CampoFormulario etiqueta="Correo Electrónico" tipo="email" valor={usuario.email} onChange={(e) => onChange(e, 'email')} />
      <CampoFormulario etiqueta="Número de Celular" tipo="text" valor={usuario.celular} onChange={(e) => onChange(e, 'celular')} />
      <CampoFormulario etiqueta="Contraseña" tipo="password" valor={usuario.contraseña} onChange={(e) => onChange(e, 'contraseña')} />
      <CampoFormulario etiqueta="Rol" tipo="select" valor={usuario.rol} onChange={(e) => onChange(e, 'rol')} opciones={roles} />
      <CampoFormulario etiqueta="Área" tipo="select" valor={usuario.area} onChange={(e) => onChange(e, 'area')} opciones={areas} />
      <button type="submit" className="boton-submit">{modoEdicion ? 'Editar' : 'Crear'} Usuario</button>
    </form>
  );
};

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({ nombre: '', identificacion: '', email: '', celular: '', contraseña: '', rol: '', area: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarListaUsuarios, setMostrarListaUsuarios] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuariosIniciales = [
      { id: 1, nombre: 'Usuario 1', identificacion: '1234567890123', email: 'usuario1@example.com', celular: '12345678', contraseña: 'password', rol: 'usuario', area: 'prestamos' },
      { id: 2, nombre: 'Usuario 2', identificacion: '9876543210987', email: 'usuario2@example.com', celular: '87654321', contraseña: 'password', rol: 'administrador', area: 'beneficios' }
    ];
    setUsuarios(usuariosIniciales);
  }, []);

  const handleUsuarioChange = (e, key) => {
    const { value } = e.target;

    if (key === 'nombre' && !/^[a-zA-Z\s]*$/.test(value)) {
      alert('El nombre solo debe contener letras');
      return;
    }

    if (key === 'identificacion' && !/^\d*$/.test(value)) {
      alert('La identificación solo debe contener números');
      return;
    }

    if (key === 'celular' && !/^\d*$/.test(value)) {
      alert('El número de celular solo debe contener números');
      return;
    }

    if (key === 'celular' && value.length > 8) {
      alert('El número de celular debe tener 8 dígitos');
      return;
    }

    setUsuarioSeleccionado(prev => ({ ...prev, [key]: value }));
  };

  const toggleDataGrid = () => {
    setMostrarListaUsuarios(true);
  };

  const crearEditarUsuario = (usuario) => {
    if (!usuario.nombre || !usuario.identificacion || !usuario.email || !usuario.celular || !usuario.contraseña || !usuario.rol || !usuario.area) {
      alert('Por favor, complete todos los campos');
      return;
    }
    if (usuario.identificacion.length !== 13) {
      alert('La identificación debe tener 13 dígitos');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(usuario.email)) {
      alert('Correo electrónico no válido');
      return;
    }
    if (usuario.celular.length !== 8) {
      alert('El número de celular debe tener 8 dígitos');
      return;
    }
    if (modoEdicion) {
      const actualizados = usuarios.map(u => u.id === usuarioSeleccionado.id ? { ...u, ...usuario } : u);
      setUsuarios(actualizados);
      alert('Usuario editado exitosamente');
    } else {
      const nuevoUsuario = { ...usuario, id: usuarios.length + 1 };
      setUsuarios([...usuarios, nuevoUsuario]);
      alert('Usuario creado exitosamente');
    }
    setUsuarioSeleccionado({ nombre: '', identificacion: '', email: '', celular: '', contraseña: '', rol: '', area: '' });
    setModoEdicion(false);
    setMostrarListaUsuarios(false);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModoEdicion(true);
    setMostrarListaUsuarios(false);
  };

  const handleEliminarUsuario = (id) => {
    const actualizados = usuarios.filter(u => u.identificacion !== id);
    setUsuarios(actualizados);
    alert('Usuario eliminado exitosamente');
  };

  return (
    <div className="gestion-usuarios-container">
      <h2>Gestión de Usuarios</h2>
      {!mostrarListaUsuarios ? (
        <button onClick={toggleDataGrid}>Ver Lista de Usuarios</button>
      ) : (
        <>
          <button onClick={() => setMostrarListaUsuarios(false)}>Volver a Formulario</button>
          <UsuariosGrid usuarios={usuarios} onEditarUsuario={handleEditarUsuario} onEliminarUsuario={handleEliminarUsuario} />
        </>
      )}
      {!mostrarListaUsuarios && (
        <FormularioUsuario
          usuario={usuarioSeleccionado}
          onSubmit={crearEditarUsuario}
          modoEdicion={modoEdicion}
          onChange={handleUsuarioChange}
        />
      )}
    </div>
  );
};

export default GestionUsuarios;
