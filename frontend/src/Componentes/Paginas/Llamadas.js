import React, { useContext, useState } from 'react';
import './Llamadas.css'; 
import { TicketContext } from './TicketContext';

const Llamadas = () => {
  const { callNextTicket, finishTicket, cancelTicket, currentTicket, attendedTickets, waitingTickets, cancelledTickets } = useContext(TicketContext);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const handleCallNext = () => {
    callNextTicket();
    setShowCancelButton(true); // Show the cancel button after calling the next ticket
  };

  const handleFinishTicket = () => {
    finishTicket();
    setShowCancelButton(false); // Hide the cancel button after finishing a ticket
  };

  const handleCancelTicket = (ticketNumber) => {
    cancelTicket(ticketNumber);
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
          <h3>Ticket Actual: {currentTicket.number.toString().padStart(3, '0')}</h3>
          <p>Tipo de Atención: {currentTicket.attentionType}</p>
          <p>Servicio: {currentTicket.service}</p>
          <button className="button finish-button" onClick={handleFinishTicket}>
            Finalizar Ticket
          </button>
          {showCancelButton && (
            <button className="button cancel-button" onClick={() => handleCancelTicket(currentTicket.number)}>
              Anular Ticket
            </button>
          )}
        </div>
      )}
      
      {/* Lista de tickets atendidos */}
      <div className="attended-tickets">
        <h3>Tickets Atendidos</h3>
        <ul>
          {attendedTickets.map((ticket) => (
            <li key={ticket.number}>
              Ticket {ticket.number.toString().padStart(3, '0')}
              <strong>Área:</strong> {ticket.service}
            </li>
          ))}
        </ul>
      </div>

      {/* Lista de tickets en espera */}
      <div className="queue-list">
        <h3>Tickets en espera</h3>
        <ul>
          {waitingTickets.map((ticket) => (
            <li key={ticket.number}>
              Ticket {ticket.number.toString().padStart(3, '0')}
              <strong>Área:</strong> {ticket.service}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Lista de tickets anulados */}
      <div className="cancelled-tickets">
        <h3>Tickets Anulados</h3>
        <ul>
          {cancelledTickets.map((ticket) => (
            <li key={ticket.number}>
              Ticket {ticket.number.toString().padStart(3, '0')}
              <strong>Área:</strong> {ticket.service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Llamadas;