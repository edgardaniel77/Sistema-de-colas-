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
  const { tickets, addTicket } = useContext(TicketContext);

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
      number: tickets.length + 1
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
    const counter = tickets.length;
    const pdf = new jsPDF();
    const ticketText = `INJUPEMP Ticket de Turno A-${counter}`;
    pdf.text(ticketText, 20, 20);
    pdf.text(`Número de Identidad: ${identityNumber}`, 20, 30);
    pdf.text(`Tipo de Atención: ${attentionType}`, 20, 40);
    pdf.text(`Servicio: ${service}`, 20, 50);
    pdf.text('Gracias por su visita.', 20, 70);
    pdf.save('ticket.pdf');
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
          <p>Número de ticket: {tickets.length}</p>
          <button className="button print-button" onClick={printTicket}>
            <FontAwesomeIcon icon={faPrint} /> Imprimir Ticket
          </button>
          <button className="button back-button" onClick={() => setStep(1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Volver al Inicio
          </button>
        </div>
      )}
    </div>
  );
};

export default Display;
