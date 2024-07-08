import React, { useContext } from 'react';
import './Llamadas.css';
import { TicketContext } from './TicketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Llamadas = () => {
  const { tickets, callNextTicket, finishTicket, currentTicket } = useContext(TicketContext);

  const handleCallNext = () => {
    callNextTicket();
  };

  const handleFinishTicket = () => {
    finishTicket();
  };

  return (
    <div className="llamadas-container">
      <h2>Llamadas</h2>
      <div className="llamadas-buttons">
        <button className="llamadas-button" onClick={handleCallNext}>
          <FontAwesomeIcon icon={faUser} /> Llamar Siguiente
        </button>
        <button className="llamadas-button" onClick={handleFinishTicket}>
          <FontAwesomeIcon icon={faThumbsUp} /> Finalizar Atención
        </button>
      </div>
      <div className="current-ticket">
        {currentTicket ? (
          <div>
            <h3>Atendiendo a:</h3>
            <p>Número de ticket: {currentTicket.number}</p>
            <p>Identidad: {currentTicket.identityNumber}</p>
            <p>Servicio: {currentTicket.service}</p>
          </div>
        ) : (
          <p>No hay tickets en espera.</p>
        )}
      </div>
      <div className="attended-tickets">
        <h3>Atendidos</h3>
        <ul>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <li key={ticket.number}>
                <p>Número de ticket: {ticket.number}</p>
                <p>Identidad: {ticket.identityNumber}</p>
                <p>Servicio: {ticket.service}</p>
              </li>
            ))
          ) : (
            <li>No hay tickets atendidos aún.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Llamadas;
