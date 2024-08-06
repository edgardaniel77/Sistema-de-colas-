import React, { useContext, useEffect, useState } from 'react';
import './SalaEspera.css';
import { TicketContext } from './TicketContext';

const SalaEspera = () => {
  const { currentTickets } = useContext(TicketContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualiza la hora cada segundo
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  return (
    <div className="sala-espera-container">
      <div className="header">
        <h2>Espere su turno</h2>
        <div className="clock">
        {formatTime(currentTime)}
        </div>
      </div>

      <div className="ticket-section">
        <div className="ticket-list">
          {Object.entries(currentTickets).length > 0 ? (
            Object.entries(currentTickets).map(([area, ticket]) => (
              <div key={ticket.number} className="ticket-area">
                <h3> {area} </h3>
                <p> {ticket.number} </p>
                
              </div>
            ))
          ) : (
            <p>No hay tickets en espera.</p>
          )}
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

