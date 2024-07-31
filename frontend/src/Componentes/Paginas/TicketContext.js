import React, { createContext, useState } from 'react';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketCounter, setTicketCounter] = useState(0);
  const [cancelledTickets, setCancelledTickets] = useState([]);

  const addTicket = (newTicket) => {
    setTicketCounter(prevCounter => prevCounter + 1);

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
    setTickets([...tickets, { ...newTicket, number: formattedNumber, startTime: null, endTime: null }]);
  };

  const callNextTicket = () => {
    if (tickets.length > 0) {
      const preferentialTickets = tickets.filter(t => t.attentionType === 'Preferencial');
      const normalTickets = tickets.filter(t => t.attentionType === 'Normal');

      const nextTicket = preferentialTickets.length > 0 ? preferentialTickets[0] : normalTickets[0];
      
      if (nextTicket) {
        setTickets(tickets.filter(t => t.number !== nextTicket.number));
        setCurrentTicket({ ...nextTicket, startTime: new Date() });
      }
    }
  };

  const finishTicket = () => {
    if (currentTicket) {
      const finishedTicket = { ...currentTicket, endTime: new Date() };
      setAttendedTickets([...attendedTickets, finishedTicket]);
      setCurrentTicket(null);
    }
  };

  const transferTicket = (ticket, newService) => {
    const updatedTickets = tickets.map(t =>
      t.number === ticket.number ? { ...t, service: newService } : t
    );
    setTickets(updatedTickets);
    if (currentTicket && currentTicket.number === ticket.number) {
      setCurrentTicket({ ...currentTicket, service: newService });
    }
  };

  const cancelTicket = (ticketNumber) => {
    // Filtrar el ticket que se va a anular
    const ticketToCancel = tickets.find(ticket => ticket.number === ticketNumber);
    
    // Actualizar el estado de los tickets
    setTickets(tickets.filter(ticket => ticket.number !== ticketNumber));
  
    // Si el ticket anulado es el actual, limpiar el estado del ticket actual
    if (currentTicket && currentTicket.number === ticketNumber) {
      setCancelledTickets([...cancelledTickets, { ...currentTicket, endTime: new Date() }]);
      setCurrentTicket(null);
    } else {
      // Agregar a la lista de tickets anulados
      if (ticketToCancel) {
        setCancelledTickets([...cancelledTickets, { ...ticketToCancel, endTime: new Date() }]);
      }
    }
  };
  

  const waitingTickets = currentTicket ? tickets : [currentTicket, ...tickets].filter(Boolean);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        attendedTickets,
        currentTicket,
        cancelledTickets,
        addTicket,
        callNextTicket,
        finishTicket,
        transferTicket,
        cancelTicket,
        ticketCounter,
        waitingTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider, TicketContext };