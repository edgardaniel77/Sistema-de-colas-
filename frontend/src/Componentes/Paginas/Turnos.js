import React, { useState, useContext } from 'react';
import './Turnos.css';
import { TicketContext } from './TicketContext';

const areas = [
  "Secretaría General",
  "Préstamos",
  "Cartera Y Cobro",
  "Beneficios",
  "Planilla Jubilados"
];

const Turnos = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [transferArea, setTransferArea] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showWaitingList, setShowWaitingList] = useState(false);

  const { tickets, currentTickets, cancelledTickets, callNextTicket, finishTicket, transferTicket, cancelTicket } = useContext(TicketContext);

  const handleAreaSelection = (area) => {
    setSelectedArea(area);
    setShowWaitingList(true);
    setShowCancelButton(false);
  };

  const callNextTicketForArea = () => {
    if (selectedArea) {
      callNextTicket(selectedArea);
      setShowCancelButton(true);
      // Move the called ticket to the top of the list
      setShowWaitingList(false);
      setTimeout(() => setShowWaitingList(true), 0); // Force re-render
    }
  };

  const finishCurrentTicket = () => {
    if (selectedArea) {
      finishTicket(selectedArea);
      setShowCancelButton(false);
    }
  };

  const cancelCurrentTicket = () => {
    if (selectedArea) {
      cancelTicket(selectedArea);
      setShowCancelButton(false);
      setShowWaitingList(false);
    }
  };
  
  const handleTransferTicket = () => {
    if (currentTickets[selectedArea] && transferArea) {
      const ticketToTransfer = currentTickets[selectedArea];
      transferTicket(ticketToTransfer, transferArea);
      setNotification(`Ticket ${ticketToTransfer.number} transferido a ${transferArea}`);
      setTransferArea(null);
    } else {
      setNotification("Seleccione un área para transferir el ticket.");
    }
  };

  return (
    <div className="turnos-container">
      <h2 className="turnos-header">Administración de Turnos por Área</h2>
      <div className="area-buttons">
        {areas.map((area, index) => (
          <button
            key={index}
            className={`area-button ${selectedArea === area ? 'selected' : ''}`}
            onClick={() => handleAreaSelection(area)}
          >
            {area}
          </button>
        ))}
      </div>
      {selectedArea && (
        <div>
          <h3>Tickets para {selectedArea}</h3>
          <div className="action-buttons">
            <button className="btn-siguiente" onClick={callNextTicketForArea}>Llamar siguiente ticket</button>
          </div>
          {currentTickets[selectedArea] && (
            <div className="ticket-details">
              <p>Estado actual: {currentTickets[selectedArea].number} - {currentTickets[selectedArea].service}</p>
              <button className="btn-finalizar" onClick={finishCurrentTicket}>Finalizar</button>
              {showCancelButton && (
                <button className="btn-anular" onClick={cancelCurrentTicket}>Anular</button>
              )}

              <div className="transfer-section">
                <label htmlFor="transferArea">Transferir a:</label>
                <select id="transferArea" value={transferArea} onChange={(e) => setTransferArea(e.target.value)}>
                  <option value="">Seleccione un área</option>
                  {areas.filter(area => area !== selectedArea).map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
                <button className="btn-transferir" onClick={handleTransferTicket}>Transferir</button>
              </div>
            </div>
          )}
          {showWaitingList && (
            <div className="waiting-list">
              <h3>Lista de Espera para {selectedArea}</h3>
              <ul>
                {tickets
                  .filter(ticket => ticket.service === selectedArea)
                  .sort((a, b) => a.number - b.number) // Sort by ticket number
                  .map((ticket, index) => (
                    <li key={index}>
                      <strong>Ticket:</strong> {ticket.number}
                    </li>
                  ))
                }
                {tickets.filter(ticket => ticket.service === selectedArea).length === 0 && (
                  <p>No hay tickets en espera para esta área.</p>
                )}
              </ul>
            </div>
          )}
          <div className="cancelled-tickets">
            <h3>Tickets Anulados</h3>
            <ul>
              {cancelledTickets.filter(ticket => ticket.service === selectedArea).map((ticket, index) => (
                <li key={index}>
                  <strong>Ticket:</strong> {ticket.number}
                </li>
              ))}
              {cancelledTickets.filter(ticket => ticket.service === selectedArea).length === 0 && (
                <p>No hay tickets anulados para esta área.</p>
              )}
            </ul>
          </div>
          {notification && <p className="notification">{notification}</p>}
        </div>
      )}
    </div>
  );
};

export default Turnos;

