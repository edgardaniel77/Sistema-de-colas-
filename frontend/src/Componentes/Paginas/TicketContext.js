import React, { createContext, useState } from 'react';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketCounter, setTicketCounter] = useState(0); // Estado para el contador de tickets generados

  const addTicket = (newTicket) => {
    // Incrementar el contador de tickets
    setTicketCounter(prevCounter => prevCounter + 1);

    // Lógica para asignar el número de ticket según el servicio seleccionado
    let ticketPrefix = '';
    switch (newTicket.service) {
      case 'Secretaría General':
        ticketPrefix = 'SG';
        break;
      case 'Préstamos':
        ticketPrefix = 'PR';
        break;
      case 'Cartera Y Cobro':
        ticketPrefix = 'CC';
        break;
      case 'Beneficios':
        ticketPrefix = 'BN';
        break;
      case 'Planilla Jubilados':
        ticketPrefix = 'PJ';
        break;
      default:
        ticketPrefix = 'NA';
    }
  
    const formattedNumber = `${ticketPrefix}-${ticketCounter.toString().padStart(3, '0')}`;
    setTickets([...tickets, { ...newTicket, number: formattedNumber }]);
  };

  const callNextTicket = () => {
    if (tickets.length > 0) {
      const nextTicket = tickets[0];
      setTickets(tickets.slice(1));
      setCurrentTicket(nextTicket);
    }
  };

  const finishTicket = () => {
    if (currentTicket) {
      setAttendedTickets([...attendedTickets, currentTicket]);
      setCurrentTicket(null);
    }
  };

  // Deriving waitingTickets from tickets and currentTicket
  const waitingTickets = currentTicket ? tickets : [currentTicket, ...tickets].filter(Boolean);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        attendedTickets,
        currentTicket,
        addTicket,
        callNextTicket,
        finishTicket,
        ticketCounter, // Pasando el contador de tickets al contexto
        waitingTickets // Agregando waitingTickets al valor del contexto
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider, TicketContext };
