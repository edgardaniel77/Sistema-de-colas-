import React, { createContext, useState } from 'react';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [ticketsByArea, setTicketsByArea] = useState({});
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [currentTickets, setCurrentTickets] = useState({});
  const [ticketCounter, setTicketCounter] = useState(0);
  const [cancelledTickets, setCancelledTickets] = useState([]);

  const addTicket = (identityNumber, attentionType, service) => {
    setTicketCounter(prevCounter => prevCounter + 1);

    const ticketPrefix = getTicketPrefix(service);
    const formattedNumber = `${ticketPrefix}-${(ticketCounter + 1).toString().padStart(3, '0')}`;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:MM:SS

    const newTicket = {
      ID_CLIENTE: identityNumber,
      TICKET: formattedNumber,
      TIPO_ATENCION: attentionType.toUpperCase(),
      SERVICIO: service.toUpperCase(),
      FECHA: formattedDate,
      HORA: formattedTime,
      startTime: null,
      endTime: null
    };

    setTicketsByArea(prevTicketsByArea => {
      const areaTickets = prevTicketsByArea[service] || [];
      return { ...prevTicketsByArea, [service]: [...areaTickets, newTicket] };
    });

    return newTicket;
  };

  const getTicketPrefix = (service) => {
    switch (service) {
      case 'Secretaría General': return 'SG';
      case 'Préstamos': return 'PR';
      case 'Cartera Y Cobro': return 'CC';
      case 'Beneficios': return 'BN';
      case 'Planilla Jubilados': return 'PJ';
      default: return 'NA';
    }
  };

  const callNextTicket = (area = null) => {
    if (!area) return;

    let ticketsToConsider = ticketsByArea[area] || [];

    if (ticketsToConsider.length > 0) {
        const preferentialTickets = ticketsToConsider.filter(t => t.TIPO_ATENCION === 'PREFERENCIAL');
        const normalTickets = ticketsToConsider.filter(t => t.TIPO_ATENCION === 'NORMAL');

        const nextTicket = preferentialTickets.length > 0 ? preferentialTickets[0] : normalTickets[0];

        if (nextTicket) {
            const updatedTickets = ticketsToConsider.filter(t => t.TICKET !== nextTicket.TICKET);
            setTicketsByArea(prev => ({
                ...prev,
                [area]: updatedTickets
            }));

            setCurrentTickets(prev => ({
                ...prev,
                [area]: { ...nextTicket, startTime: new Date() }
            }));
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
    setTicketsByArea(prevTicketsByArea => {
      // Remove ticket from current area
      const updatedTicketsFromCurrentArea = (prevTicketsByArea[ticket.SERVICIO] || []).filter(t => t.TICKET !== ticket.TICKET);
      
      // Add ticket to target area
      const updatedTicketsInTargetArea = [...(prevTicketsByArea[targetArea] || []), { ...ticket, SERVICIO: targetArea }];

      return {
        ...prevTicketsByArea,
        [ticket.SERVICIO]: updatedTicketsFromCurrentArea,
        [targetArea]: updatedTicketsInTargetArea
      };
    });
  };

  const cancelTicket = (area) => {
    if (currentTickets[area]) {
      const cancelledTicket = { ...currentTickets[area], endTime: new Date() };
      setCancelledTickets([...cancelledTickets, cancelledTicket]);
      setCurrentTickets(prev => {
        const updated = { ...prev };
        delete updated[area];
        return updated;
      });
    }
  };

  const waitingTickets = Object.values(ticketsByArea).flat().filter(ticket => !Object.values(currentTickets).some(t => t.TICKET === ticket.TICKET));

  return (
    <TicketContext.Provider
      value={{
        ticketsByArea,
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

