import React, { createContext, useState } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  // Estados para los tickets y la gestión de la cola
  const [tickets, setTickets] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [showQueue, setShowQueue] = useState(true);

  // Función para añadir un nuevo ticket
  const addTicket = (newTicket) => {
    const updatedTickets = [...tickets, { ...newTicket, number: ticketCount + 1 }];
    setTickets(updatedTickets);
    setTicketCount(ticketCount + 1);
  };

  // Función para llamar al siguiente ticket
  const callNextTicket = () => {
    const nextTicket = tickets[0];
    if (nextTicket) {
      setCurrentTicket(nextTicket);
      setTickets((prevTickets) => prevTickets.slice(1));
    }
  };

  // Función para finalizar un ticket
  const finishTicket = () => {
    if (currentTicket) {
      setAttendedTickets((prevAttendedTickets) => [...prevAttendedTickets, currentTicket]);
      setCurrentTicket(null);
    }
  };

  // Función para alternar la visibilidad de la cola de tickets
  const toggleQueueVisibility = () => {
    setShowQueue((prevShowQueue) => !prevShowQueue);
  };

  // Definición del contexto con los valores y funciones necesarios
  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        callNextTicket,
        finishTicket,
        attendedTickets,
        currentTicket,
        showQueue,
        toggleQueueVisibility,
        setCurrentTicket, // Asegúrate de incluir setCurrentTicket en el contexto
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
