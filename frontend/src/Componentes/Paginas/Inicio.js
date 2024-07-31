import React, { useState, useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js/auto';
import './Inicio.css';
import { TicketContext } from './TicketContext';

const Inicio = () => {
  const { tickets, attendedTickets, currentTicket, cancelledTickets } = useContext(TicketContext);
  const [datosMostrados, setDatosMostrados] = useState([]);
  const barChartRef = useRef();
  const pieChartRef = useRef();

  useEffect(() => {
    const barCtx = barChartRef.current.getContext('2d');
    const pieCtx = pieChartRef.current.getContext('2d');

    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Ayer', 'Hoy'],
        datasets: [{
          label: 'Cantidad',
          backgroundColor: ['#FF6384', '#36A2EB'],
          data: [28, datosMostrados.length]
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    const pieChart = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Hoy Atendido', 'Hoy No Presentado'],
        datasets: [{
          label: 'Cantidad',
          backgroundColor: ['#FFCE56', '#FF6384'],
          data: [attendedTickets.length, tickets.length + cancelledTickets.length]
        }]
      }
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [datosMostrados, attendedTickets, tickets, cancelledTickets]);

  const handleCola = (opcion) => {
    switch (opcion) {
      case 'hoy':
        setDatosMostrados(tickets);
        break;
      case 'servido':
        setDatosMostrados(attendedTickets);
        break;
        case 'no-presentado':
          setDatosMostrados(cancelledTickets); // Solo los tickets anulados
          break;
      case 'serviendo':
        setDatosMostrados(currentTicket ? [currentTicket] : []);
        break;
      default:
        setDatosMostrados([]);
    }
  };

  return (
    <div className="inicio-container">
      <div className="botones-cola">
        <button onClick={() => handleCola('hoy')}>Cola de Hoy</button>
        <button onClick={() => handleCola('servido')}>Atendidos Hoy</button>
        <button onClick={() => handleCola('no-presentado')}>Hoy No Presentado</button>
        <button onClick={() => handleCola('serviendo')}>En Atencion</button>
      </div>

      <div className="datos-hoy">
        <h2>Datos</h2>
        <table>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Servicio</th>
              <th>Hora de Inicio</th>
              <th>Hora de Finalización</th>
            </tr>
          </thead>
          <tbody>
            {datosMostrados.map((dato, index) => (
              <tr key={index}>
                <td>{dato.identityNumber}</td>
                <td>{dato.service}</td>
                <td>{dato.startTime ? new Date(dato.startTime).toLocaleTimeString() : 'N/A'}</td>
                <td>{dato.endTime ? new Date(dato.endTime).toLocaleTimeString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grafica-comparacion">
        <h2>Comparativa entre ayer y hoy</h2>
        <div className="chart-container">
          <canvas ref={barChartRef}></canvas>
        </div>
        <div className="chart-container">
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Inicio;