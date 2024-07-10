import React, { createContext, useState } from 'react';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketCounter, setTicketCounter] = useState(0);

  const addTicket = (newTicket) => {
    setTicketCounter(prevCounter => prevCounter + 1);
    setTickets([...tickets, { ...newTicket, number: ticketCounter + 1 }]);
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
        ticketCounter,
        waitingTickets // Adding waitingTickets to the context value
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider, TicketContext };
