import React, { useContext, useEffect, useState } from 'react';
import './SalaEspera.css';
import { TicketContext } from './TicketContext';

const SalaEspera = () => {
  const { tickets } = useContext(TicketContext); // Obtén tickets del contexto

  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualiza la hora cada segundo
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
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
                <strong>Área:</strong> {ticket.service}
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
