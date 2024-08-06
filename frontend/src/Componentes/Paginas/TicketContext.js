import React, { createContext, useState } from 'react';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [currentTickets, setCurrentTickets] = useState({}); // { area: ticket }
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

  const callNextTicket = (area = null) => {
    let ticketsToConsider = tickets;
  
    if (area) {
      ticketsToConsider = tickets.filter(t => t.service === area);
    }
  
    if (ticketsToConsider.length > 0) {
      const preferentialTickets = ticketsToConsider.filter(t => t.attentionType === 'Preferencial');
      const normalTickets = ticketsToConsider.filter(t => t.attentionType === 'Normal');
  
      const nextTicket = preferentialTickets.length > 0 ? preferentialTickets[0] : normalTickets[0];
      
      if (nextTicket) {
        // Remove the called ticket from the tickets list
        const updatedTickets = tickets.filter(t => t.number !== nextTicket.number);
  
        // Update the state with the new list of tickets
        setTickets(updatedTickets);
  
        // Update the currentTickets state to reflect the called ticket
        setCurrentTickets(prev => ({ ...prev, [area]: { ...nextTicket, startTime: new Date() } }));
      }
    }
  };
  
  const finishTicket = (area) => {
    if (currentTickets[area]) {
      const finishedTicket = { ...currentTickets[area], endTime: new Date() };
      setAttendedTickets([...attendedTickets, finishedTicket]);
      setCurrentTickets(prev => {
        const updated = { ...prev };
        delete updated[area];
        return updated;
      });
    }
  };

  const transferTicket = (ticket, targetArea) => {
    setTickets((prevTickets) => {
      // Filter out the ticket being transferred
      const updatedTickets = prevTickets.filter(t => t.number !== ticket.number);

      // Add the ticket to the new area
      const updatedTicketsWithNewArea = [
        ...updatedTickets,
        { ...ticket, service: targetArea } // Update the ticket with the new area
      ];

      return updatedTicketsWithNewArea;
    });
  };

  const cancelTicket = (area) => {
    if (currentTickets[area]) {
      const cancelledTicket = { ...currentTickets[area], endTime: new Date() };
      setCancelledTickets([...cancelledTickets, cancelledTicket]); // Add to cancelledTickets
      setAttendedTickets([...attendedTickets, cancelledTicket]); // Add to attendedTickets
      setCurrentTickets(prev => {
        const updated = { ...prev };
        delete updated[area];
        return updated;
      });
    }
  };
  
  const waitingTickets = tickets.filter(ticket => !Object.values(currentTickets).some(t => t.number === ticket.number));
  
  return (
    <TicketContext.Provider
      value={{
        tickets,
        attendedTickets,
        currentTickets,
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

