import React, { useContext } from 'react';
import './Llamadas.css'; 
import { TicketContext } from './TicketContext';

const Llamadas = () => {
  const { callNextTicket, finishTicket, currentTicket, attendedTickets, waitingTickets } = useContext(TicketContext);

  const handleCallNext = () => {
    callNextTicket();
  };

  const handleFinishTicket = () => {
    finishTicket();
  };

  return (
    <div className="llamadas-container">
      <h2>Llamadas</h2>
      
      {/* Botón para llamar al siguiente ticket */}
      <button className="button call-button" onClick={handleCallNext}>
        Llamar al siguiente ticket
      </button>
      
      {/* Sección del ticket actual */}
      {currentTicket && (
        <div className="current-ticket">
          <h3>Ticket Actual: A-{currentTicket.number.toString().padStart(3, '0')}</h3>
          <p>Tipo de Atención: {currentTicket.attentionType}</p>
          <p>Servicio: {currentTicket.service}</p>
          {/* Botón para finalizar el ticket actual */}
          <button className="button finish-button" onClick={handleFinishTicket}>
            Finalizar Ticket
          </button>
        </div>
      )}
      
      {/* Lista de tickets atendidos */}
      <div className="attended-tickets">
        <h3>Tickets Atendidos</h3>
        <ul>
          {attendedTickets.map((ticket) => (
            <li key={ticket.number}>
              Ticket A-{ticket.number.toString().padStart(3, '0')}
              <strong>Área:</strong> {ticket.service}
            </li>
          ))}
        </ul>
      </div>
      <div className="queue-list">
        <h3>Tickets en espera</h3>
        <ul>
          {waitingTickets.map((ticket) => (
            <li key={ticket.number}>
              Ticket A-{ticket.number.toString().padStart(3, '0')}
              <strong>Área:</strong> {ticket.service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Llamadas;
