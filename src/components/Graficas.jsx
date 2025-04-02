import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import '../styles/Grafica.css';

const Graficas = () => {
  // Estado para almacenar datos históricos
  const [historicalData, setHistoricalData] = useState({
    peso: { 
      labels: [], 
      values: [] 
    },
    altura: { 
      labels: [], 
      values: [] 
    },
    temperaturaCorporal: { 
      labels: [], 
      values: [] 
    },
    frecuenciaRespiratoria: { 
      labels: [], 
      values: [] 
    }
  });

  // Estado para almacenar último valor de cada sensor
  const [sensorData, setSensorData] = useState({
    peso: 0,
    altura: 0,
    temperaturaCorporal: 0,
    frecuenciaRespiratoria: 0,
  });

  // Estado para controlar si se están recibiendo datos
  const [isReceiving, setIsReceiving] = useState(true);

  // Opciones para las gráficas
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return value;
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    },
    animation: {
      duration: 0 // Desactivar animaciones para mejor rendimiento
    }
  };

  // Convertir datos históricos al formato que espera Chart.js
  const chartData = {
    peso: {
      labels: historicalData.peso.labels,
      datasets: [
        {
          label: 'Peso (kg)',
          data: historicalData.peso.values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.3,
        },
      ],
    },
    altura: {
      labels: historicalData.altura.labels,
      datasets: [
        {
          label: 'Altura (cm)',
          data: historicalData.altura.values,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.3,
        },
      ],
    },
    temperaturaCorporal: {
      labels: historicalData.temperaturaCorporal.labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: historicalData.temperaturaCorporal.values,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          tension: 0.3,
        },
      ],
    },
    frecuenciaRespiratoria: {
      labels: historicalData.frecuenciaRespiratoria.labels,
      datasets: [
        {
          label: 'Frecuencia Respiratoria',
          data: historicalData.frecuenciaRespiratoria.values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
        },
      ],
    },
  };

  // Función para formatear valores numéricos
  const formatValue = (value, decimals = 1) => {
    return Number(value).toFixed(decimals);
  };

  // Función para actualizar datos históricos
  const updateHistoricalData = (sensorType, value) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    setHistoricalData(prev => {
      // Mantener solo los últimos 30 puntos para rendimiento
      const newLabels = [...prev[sensorType].labels, timeString].slice(-30);
      const newValues = [...prev[sensorType].values, value].slice(-30);
      
      return {
        ...prev,
        [sensorType]: {
          labels: newLabels,
          values: newValues
        }
      };
    });
  };

  // Función para obtener la tendencia (↑ o ↓)
  const getTrend = (sensorType) => {
    const values = historicalData[sensorType].values;
    if (values.length < 2) return '-';
    
    return values[values.length - 1] > values[values.length - 2] ? '↑' : '↓';
  };

  // Efecto para conectar con WebSockets
  useEffect(() => {
    if (!isReceiving) return;

    // WebSocket connections for all three sensors (usando exactamente las mismas URLs)
    const wsPeso = new WebSocket('ws://192.168.1.73:8080');
    const wsOtros = new WebSocket('ws://192.168.156.91:8081');
    const wsRespiratoria = new WebSocket('ws://192.168.1.75:8082');

    // Update sensor data safely (misma función que en Analysis)
    const updateSensorData = (sensorType, value) => {
      setSensorData((prev) => ({
        ...prev,
        [sensorType]: value,
      }));
      
      // También actualizar datos históricos para las gráficas
      updateHistoricalData(sensorType, value);
    };

    // WebSocket message handlers (misma lógica que en Analysis)
    const setupWebSocket = (ws, sensorType) => {
      ws.onmessage = (event) => {
        try {
          if (isReceiving) {
            const data = JSON.parse(event.data);
            if (data.sensorType === sensorType) {
              updateSensorData(sensorType, data.value);
            }
          }
        } catch (error) {
          console.error(`Error processing data from ${sensorType}:`, error);
        }
      };

      ws.onerror = () => console.error(`WebSocket connection error for ${sensorType}`);
      ws.onclose = () => console.log(`WebSocket ${sensorType} closed`);
    };

    // Configurar cada WebSocket con su sensor correspondiente
    setupWebSocket(wsPeso, 'peso');
    setupWebSocket(wsOtros, 'altura');
    setupWebSocket(wsOtros, 'temperaturaCorporal');
    setupWebSocket(wsRespiratoria, 'frecuenciaRespiratoria');

    // Cleanup function
    return () => {
      wsPeso.close();
      wsOtros.close();
      wsRespiratoria.close();
    };
  }, [isReceiving]);

  return (
    <div className="charts-container">
      <h1 className="charts-title">Monitoreo de Signos Vitales en Tiempo Real</h1>
      
      <div className="buttons-section">
        <button 
          className={`toggle-button ${isReceiving ? 'receiving' : 'paused'}`}
          onClick={() => setIsReceiving(!isReceiving)}
        >
          {isReceiving ? 'Pausar Monitoreo' : 'Reanudar Monitoreo'}
        </button>
      </div>
      
      <div className="charts-grid">
        <div className="chart-item">
          <h3>Peso (kg)</h3>
          <div className="chart-container">
            <Line options={options} data={chartData.peso} />
          </div>
        </div>
        
        <div className="chart-item">
          <h3>Altura (cm)</h3>
          <div className="chart-container">
            <Line options={options} data={chartData.altura} />
          </div>
        </div>
        
        <div className="chart-item">
          <h3>Temperatura Corporal (°C)</h3>
          <div className="chart-container">
            <Line options={options} data={chartData.temperaturaCorporal} />
          </div>
        </div>
        
        <div className="chart-item">
          <h3>Frecuencia Respiratoria</h3>
          <div className="chart-container">
            <Line options={options} data={chartData.frecuenciaRespiratoria} />
          </div>
        </div>
      </div>
      
      <div className="stats-section">
        <h2>Resumen de Signos Vitales</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">⚖️</div>
            <div className="stat-info">
              <h3>Peso</h3>
              <p className="stat-value">{formatValue(sensorData.peso)} kg</p>
              <p className={`stat-trend ${getTrend('peso') === '↑' ? 'up' : 'down'}`}>
                {getTrend('peso')}
              </p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📏</div>
            <div className="stat-info">
              <h3>Altura</h3>
              <p className="stat-value">{formatValue(sensorData.altura)} cm</p>
              <p className={`stat-trend ${getTrend('altura') === '↑' ? 'up' : 'down'}`}>
                {getTrend('altura')}
              </p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🌡️</div>
            <div className="stat-info">
              <h3>Temperatura</h3>
              <p className="stat-value">{formatValue(sensorData.temperaturaCorporal, 1)} °C</p>
              <p className={`stat-trend ${getTrend('temperaturaCorporal') === '↑' ? 'up' : 'down'}`}>
                {getTrend('temperaturaCorporal')}
              </p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💨</div>
            <div className="stat-info">
              <h3>Respiración</h3>
              <p className="stat-value">{formatValue(sensorData.frecuenciaRespiratoria, 0)}</p>
              <p className={`stat-trend ${getTrend('frecuenciaRespiratoria') === '↑' ? 'up' : 'down'}`}>
                {getTrend('frecuenciaRespiratoria')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficas;