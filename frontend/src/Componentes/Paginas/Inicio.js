import React, { useState, useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js/auto';
import './Inicio.css';
import { TicketContext } from './TicketContext';

const Inicio = () => {
  const {  attendedTickets, cancelledTickets, currentTickets, waitingTickets } = useContext(TicketContext);
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
          label: 'Cantidad de Tickets',
          backgroundColor: ['#FF6384', '#36A2EB'],
          data: [0, datosMostrados.length]  // Reemplaza el 0 con los datos de ayer si los tienes
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
          label: 'Cantidad de Tickets',
          backgroundColor: ['#FFCE56', '#FF6384'],
          data: [attendedTickets.length, cancelledTickets.length]
        }]
      }
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [datosMostrados, attendedTickets, cancelledTickets]);

  const handleCola = (opcion) => {
    switch (opcion) {
      case 'hoy':
        setDatosMostrados(waitingTickets);
        break;
      case 'servido':
        setDatosMostrados(attendedTickets);
        break;
      case 'no-presentado':
        setDatosMostrados(cancelledTickets);
        break;
      case 'serviendo':
        setDatosMostrados(Object.values(currentTickets));
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
        <button onClick={() => handleCola('serviendo')}>En Atención</button>
      </div>

      <div className="datos-hoy">
        <h2>Datos</h2>
        <table>
          <thead>
            <tr>
              <th>Tickets</th>
              <th>Servicio</th>
              <th>Hora de Inicio</th>
              <th>Hora de Finalización</th>
            </tr>
          </thead>
          <tbody>
            {datosMostrados.map((dato, index) => (
              <tr key={index}>
                <td>{dato.number}</td>
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

