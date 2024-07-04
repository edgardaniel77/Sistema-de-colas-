import React, { useState, useEffect } from 'react';
import './SalaEspera.css';

const SalaEspera = () => {
  const [tickets, setTickets] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const ticketInterval = setInterval(() => {
      const areas = [
        'Secretaría General',
        'Préstamos',
        'Cartera y Cobro',
        'Planilla de Jubilados',
        'Beneficios',
      ];
      const newTicket = {
        number: Math.floor(Math.random() * 100) + 1,
        area: areas[Math.floor(Math.random() * areas.length)]
      };
      setTickets(prevTickets => [...prevTickets, newTicket]);
    }, 5000); // Generar un nuevo número cada 5 segundos

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualizar el tiempo cada segundo

    return () => {
      clearInterval(ticketInterval);
      clearInterval(timeInterval);
    }; // Limpiar los intervalos cuando el componente se desmonte
  }, []);

  return (
    <div className="sala-espera-container">
      <div className="header">
        <h2>Espere su turno</h2>
        <div className="clock">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
      <div className="ticket-section">
        <div className="ticket-list">
          <ul>
            {tickets.map((ticket, index) => (
              <li key={index}>
                <strong>Área:</strong> {ticket.area}
                <strong>Número:</strong> A-{ticket.number.toString().padStart(3, '0')}
              </li>
            ))}
          </ul>
        </div>
        <div className="advertisement">
          <h2>INJUPEMP</h2>
          <img src="https://pbs.twimg.com/media/FiGf0zFXoAAqitK.jpg" alt="Publicidad" />
        </div>
      </div>
      <div className="informative-banner">
        <p>Bienvenidos a INJUPEMP, por favor espere su turno.</p>
      </div>
    </div>
  );
};

export default SalaEspera;
