import React, { useEffect, useRef } from 'react';
import { Grid } from 'gridjs';
import { html } from 'gridjs';

const UsuariosGrid = ({ usuarios, onEditarUsuario, onEliminarUsuario }) => {
  const gridRef = useRef(null);
  const gridInstance = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gridInstance.current = new Grid({
        columns: [
          "Nombre",
          "Identificación",
          "Correo Electrónico",
          "Celular",
          "Rol",
          "Área",
          {
            name: "Acciones",
            formatter: (cell, row) => {
              const id = row.cells[1].data;
              return html(`
                <button class="boton-accion editar" data-id="${id}">Editar</button>
                <button class="boton-accion eliminar" data-id="${id}">Eliminar</button>
              `);
            },
          },
        ],
        data: usuarios.map(usuario => [
          usuario.nombre,
          usuario.identificacion,
          usuario.email,
          usuario.celular,
          usuario.rol,
          usuario.area,
        ]),
        pagination: true,
        search: true,
      });

      gridInstance.current.render(gridRef.current);

      const handleEditClick = (event) => {
        if (event.target.classList.contains('editar')) {
          const id = event.target.getAttribute('data-id');
          const usuario = usuarios.find(u => u.identificacion === id);
          if (usuario) {
            onEditarUsuario(usuario);
          }
        }
      };

      const handleDeleteClick = (event) => {
        if (event.target.classList.contains('eliminar')) {
          const id = event.target.getAttribute('data-id');
          const confirmacion = window.confirm('¿Estás seguro de eliminar este usuario?');
          if (confirmacion) {
            onEliminarUsuario(id);
          }
        }
      };

      gridRef.current.addEventListener('click', handleEditClick);
      gridRef.current.addEventListener('click', handleDeleteClick);

      return () => {
        if (gridInstance.current) {
          gridInstance.current.destroy();
          gridInstance.current = null;
        }
        if (gridRef.current) {
          gridRef.current.removeEventListener('click', handleEditClick);
          gridRef.current.removeEventListener('click', handleDeleteClick);
        }
      };
    }
  }, [usuarios, onEditarUsuario, onEliminarUsuario]);

  return <div ref={gridRef} />;
};

export default UsuariosGrid;
