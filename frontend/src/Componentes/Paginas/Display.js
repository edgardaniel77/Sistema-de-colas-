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
  const inputRef = useRef(null);
  const { addTicket, ticketCounter, tickets } = useContext(TicketContext);
  

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

  const handleServiceSelection = (serviceSelected) => {
    setService(serviceSelected);
    const newTicket = {
      identityNumber,
      attentionType,
      service: serviceSelected,
      number: `${serviceSelected.slice(0, 2).toUpperCase()}-${ticketCounter + 1}`
    };
    addTicket(newTicket);
    setIdentityNumber('');
    setStep(4);
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
    let ticketPrefix = '';
    switch (service) {
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
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
  
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
    const ticketText = `Ticket: ${formattedNumber}`;
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
  
    // Redirige al paso 1 para reiniciar el flujo
    setTimeout(() => {
      setStep(1);
    }, 1000); // Ajusta el tiempo si es necesario para asegurar que el PDF se haya guardado
  };
  
  
  
  const handleBackClick = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="display-container">
      <h1>Bienvenido a INJUPEMP</h1>
      {step === 1 && (
        <form onSubmit={handleIdentitySubmit}>
          <label>
            Ingrese su Número de Identidad:
            <input
              type="number"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              required
              ref={inputRef}
            />
            {errors.identityNumber && <span className="error">{errors.identityNumber}</span>}
          </label>
          <div className="numeric-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
              <button
                key={number}
                className="numeric-button"
                onClick={() => handleNumberClick(number.toString())}
                style={{ gridColumn: ((index % 3) + 1) }}
                type="button"
              >
                {number}
              </button>
            ))}
            <button className="numeric-button zero" onClick={() => handleNumberClick('0')} type="button">
              0
            </button>
            <button className="numeric-button backspace" onClick={handleBackspaceClick} type="button">
              ←
            </button>
          </div>
          <button className="button next-button" type="submit">Siguiente</button>
        </form>
      )}
      {step === 2 && (
        <div>
          <h2>Selecciona Atención</h2>
          <button className="button selection-button" onClick={() => handleAttentionType('Preferencial')}>
            <FontAwesomeIcon icon={faUserCircle} /> Atención Preferencial
          </button>
          <button className="button selection-button" onClick={() => handleAttentionType('Normal')}>
            <FontAwesomeIcon icon={faUser} /> Atención Normal
          </button>
          <button className="button back-button" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Selecciona Área</h2>
          <button className="button selection-button" onClick={() => handleServiceSelection('Secretaría General')}>
            <FontAwesomeIcon icon={faMoneyBillAlt} /> Secretaría General
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Préstamos')}>
            <FontAwesomeIcon icon={faBook} /> Préstamos
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Cartera Y Cobro')}>
            <FontAwesomeIcon icon={faHandHoldingUsd} /> Cartera Y Cobro
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Beneficios')}>
            <FontAwesomeIcon icon={faThumbsUp} /> Beneficios
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Planilla Jubilados')}>
            <FontAwesomeIcon icon={faUserAlt} /> Planilla Jubilados
          </button>
          <button className="button back-button" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Confirmación de Servicio</h2>
          <p>Servicio seleccionado: {service}</p>
          <p>Tipo de atención: {attentionType}</p>
          <p>Número de ticket: {tickets[tickets.length - 1]?.number}</p>
          <button className="button print-button" onClick={printTicket}>
            <FontAwesomeIcon icon={faPrint} /> Imprimir Ticket
          </button>
          <button className="button back-button" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default Display;