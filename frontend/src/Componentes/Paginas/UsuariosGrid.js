import React, { useEffect, useRef } from 'react';
import { Grid } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';

const UsuariosGrid = ({ usuarios, actualizarUsuarios }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: ["Nombre", "Identificación", "Correo Electrónico", "Celular", "Rol", "Área"],
        data: usuarios.map(usuario => [
          usuario.nombre,
          usuario.identificacion,
          usuario.email,
          usuario.celular,
          usuario.rol,
          usuario.area
        ]),
        pagination: true,
        search: true
      });

      gridRef.current.innerHTML = ''; // Limpiar cualquier contenido previo
      grid.render(gridRef.current);

      return () => {
        grid.destroy(); // Limpiar y destruir la instancia de Grid al desmontar el componente
      };
    }
  }, [usuarios]);

  useEffect(() => {
    // Actualiza el grid cuando cambian los usuarios
    if (gridRef.current) {
      const grid = new Grid({
        columns: ["Nombre", "Identificación", "Correo Electrónico", "Celular", "Rol", "Área"],
        data: usuarios.map(usuario => [
          usuario.nombre,
          usuario.identificacion,
          usuario.email,
          usuario.celular,
          usuario.rol,
          usuario.area
        ]),
        pagination: true,
        search: true
      });

      gridRef.current.innerHTML = ''; // Limpiar cualquier contenido previo
      grid.render(gridRef.current);
    }
  }, [usuarios]);

  return <div ref={gridRef} />;
};

export default UsuariosGrid;
