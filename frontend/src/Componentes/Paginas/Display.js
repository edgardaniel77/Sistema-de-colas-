import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
import './Display.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faUserAlt, faThumbsUp, faMoneyBillAlt, faBook, faHandHoldingUsd, faPrint, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import { TicketContext } from './TicketContext';

const Display = () => {
  const [step, setStep] = useState(1);
  const [identityNumber, setIdentityNumber] = useState('');
  const [attentionType, setAttentionType] = useState('');
  const [service, setService] = useState('');
  const [errors, setErrors] = useState({});
  const [currentTicketNumber, setCurrentTicketNumber] = useState(''); // Add state for the current ticket number
  const inputRef = useRef(null);
  const { addTicket, tickets } = useContext(TicketContext);

  const validateIdentityNumber = () => {
    if (identityNumber.trim() === '') {
      return 'Por favor, ingrese su número de identidad.';
    }
    if (!/^\d{13}$/.test(identityNumber)) {
      return 'El número de identidad debe contener solo 13 dígitos.';
    }
    return '';
  };

  const handleIdentitySubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateIdentityNumber();
    if (errorMessage) {
      setErrors({ identityNumber: errorMessage });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleAttentionType = (type) => {
    setAttentionType(type);
    setStep(3);
  };

  const handleServiceSelection = async (serviceSelected) => {
    setService(serviceSelected);
    const newTicket = addTicket(identityNumber, attentionType, serviceSelected);
    setCurrentTicketNumber(newTicket.TICKET); // Save the ticket number for later use

    try {
      const response = await fetch('http://localhost:5000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTicket)
      });

      if (response.ok) {
        setIdentityNumber('');
        setStep(4);
      } else {
        const errorData = await response.json();
        console.error('Error al crear el ticket:', errorData);
        setErrors({ general: 'Hubo un error al crear el ticket. Inténtelo de nuevo.' });
      }
    } catch (error) {
      console.error('Error de red al crear el ticket:', error);
      setErrors({ general: 'Hubo un error de red. Inténtelo de nuevo más tarde.' });
    }
  };

  const handleNumberClick = (number) => {
    setIdentityNumber((prevNumber) => prevNumber + number);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspaceClick = () => {
    setIdentityNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleKeyPress = useCallback((e) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (validKeys.includes(e.key)) {
      setIdentityNumber((prevNumber) => prevNumber + e.key);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  const printTicket = () => {
    const formattedDate = new Date().toLocaleDateString();
    const formattedTime = new Date().toLocaleTimeString();
    const formattedNumber = currentTicketNumber; // Use the current ticket number
  
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
  
    // Header
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    const headerText = 'INJUPEMP';
    const headerTextWidth = pdf.getTextWidth(headerText);
    pdf.text(headerText, (pageWidth - headerTextWidth) / 2, 20);
    
    pdf.setFontSize(14);
    const subHeaderText = 'Bienvenido ';
    const subHeaderTextWidth = pdf.getTextWidth(subHeaderText);
    pdf.text(subHeaderText, (pageWidth - subHeaderTextWidth) / 2, 30);
  
    // Ticket Info
    pdf.setFontSize(50);
    pdf.setFont('helvetica', 'bold');
    const ticketText = `TICKET: ${formattedNumber}`;
    const ticketTextWidth = pdf.getTextWidth(ticketText);
    pdf.text(ticketText, (pageWidth - ticketTextWidth) / 2, 50);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    const attentionTypeText = `Tipo de Atención: ${attentionType}`;
    const serviceText = `Servicio: ${service}`;
    const attentionTypeTextWidth = pdf.getTextWidth(attentionTypeText);
    const serviceTextWidth = pdf.getTextWidth(serviceText);
    pdf.text(attentionTypeText, (pageWidth - attentionTypeTextWidth) / 2, 65);
    pdf.text(serviceText, (pageWidth - serviceTextWidth) / 2, 80);
    
    // Date and Time
    pdf.setFontSize(12);
    const dateText = `Fecha: ${formattedDate}`;
    const timeText = `Hora: ${formattedTime}`;
    const dateTextWidth = pdf.getTextWidth(dateText);
    const timeTextWidth = pdf.getTextWidth(timeText);
    pdf.text(dateText, (pageWidth - dateTextWidth) / 2, 100);
    pdf.text(timeText, (pageWidth - timeTextWidth) / 2, 115);
  
    // Footer
    pdf.setFontSize(10);
    pdf.setFont('arial', 'italic');
    const footerText = 'Gracias por su visita.';
    const footerTextWidth = pdf.getTextWidth(footerText);
    pdf.text(footerText, (pageWidth - footerTextWidth) / 2, 130);
    
    // Draw a border around the ticket
    pdf.rect(10, 10, pageWidth - 20, 140); // Adjust dimensions as needed
  
    pdf.save('ticket.pdf');
  
    // Añadir un retraso antes de regresar al paso 1 para asegurar que el PDF se haya guardado
    setTimeout(() => {
      setStep(1);
    }, 1000); // 1000 milisegundos (1 segundo) de espera
  };
  

  return (
    <div className="display-container">
      {step === 1 && (
        <div className="identity-step">
          <h2>Ingrese su número de identidad</h2>
          <form onSubmit={handleIdentitySubmit}>
            <input
              ref={inputRef}
              type="number"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              maxLength="13"
            />
            {errors.identityNumber && <p className="error">{errors.identityNumber}</p>}
            <div className="keyboard">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button key={number} type="button" onClick={() => handleNumberClick(number.toString())}>
                  {number}
                </button>
              ))}
              <button className="numeric-button zero" onClick={() => handleNumberClick('0')} type="button">
                0
              </button>
              <button type="button" onClick={handleBackspaceClick}>
                ←
              </button>
            </div>
            <button type="submit" className="next-button">
              Siguiente
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="attention-step">
          <h2>Seleccione el tipo de atención</h2>
          <div className="attention-buttons">
            <button onClick={() => handleAttentionType('Normal')}>
              <FontAwesomeIcon icon={faUser} /> Normal
            </button>
            <button onClick={() => handleAttentionType('Preferencial')}>
              <FontAwesomeIcon icon={faUserAlt} /> Preferencial
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="service-step">
          <h2>Seleccione un servicio</h2>
          <div className="service-buttons">
            <button onClick={() => handleServiceSelection('Secretaría General')}>
              <FontAwesomeIcon icon={faBook} /> Secretaría General
            </button>
            <button onClick={() => handleServiceSelection('Préstamos')}>
              <FontAwesomeIcon icon={faMoneyBillAlt} /> Préstamos
            </button>
            <button onClick={() => handleServiceSelection('Cartera Y Cobro')}>
              <FontAwesomeIcon icon={faHandHoldingUsd} /> Cartera Y Cobro
            </button>
            <button onClick={() => handleServiceSelection('Beneficios')}>
              <FontAwesomeIcon icon={faThumbsUp} /> Beneficios
            </button>
            <button onClick={() => handleServiceSelection('Planilla Jubilados')}>
              <FontAwesomeIcon icon={faUserCircle} /> Planilla Jubilados
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="confirmation-step">
          <h2>¡Gracias! Su ticket ha sido creado.</h2>
          {errors.general && <p className="error">{errors.general}</p>}
          <button onClick={printTicket}>
            <FontAwesomeIcon icon={faPrint} /> Imprimir Ticket
          </button>
         
        </div>
      )}
    </div>
  );
};

export default Display;

