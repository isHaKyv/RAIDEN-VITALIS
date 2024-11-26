import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Analysis.css';
import BodyImage from '../assets/Cuerpo.png';

const Analysis = () => {
    const navigate = useNavigate();
    const [sensorData, setSensorData] = useState({
        peso: 0,
        altura: 0,
        temperaturaCorporal: 0,
        frecuenciaRespiratoria: 0,
    });
    const [isReceiving, setIsReceiving] = useState(true);
    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        // WebSocket connections for all three sensors
        const wsPeso = new WebSocket('ws://192.168.1.73:8080');
        const wsOtros = new WebSocket('ws://192.168.1.74:8081');
        const wsRespiratoria = new WebSocket('ws://192.168.1.75:8082'); // ESP32-3

        // Update sensor data safely
        const updateSensorData = (sensorType, value) => {
            setSensorData((prev) => ({
                ...prev,
                [sensorType]: value,
            }));
        };

        // WebSocket message handlers
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

        setupWebSocket(wsPeso, 'peso');
        setupWebSocket(wsOtros, 'altura');
        setupWebSocket(wsOtros, 'temperaturaCorporal');
        setupWebSocket(wsRespiratoria, 'frecuenciaRespiratoria');

        return () => {
            wsPeso.close();
            wsOtros.close();
            wsRespiratoria.close();
        };
    }, [isReceiving]);

    const handleSave = () => {
        setIsReceiving(false);
        setSavedData(sensorData);
    };

    const handleNext = () => {
        navigate('/add-data', { state: { savedData } });
    };

    return (
        <div className="analysis-container">
            <div className="analysis-box">
                <h2 className="analysis-title">Preliminary Analysis</h2>
                <div className="content-section">
                    <div className="body-section">
                        <img src={BodyImage} alt="Body" className="body-image" />
                    </div>
                    <div className="measurements-section">
                        <ul className="measurements-list">
                            <li className="measurement-item">
                                <div className="measurement-icon">⚖️</div>
                                <span className="measurement-value">Peso: {sensorData.peso} kg</span>
                            </li>
                            <li className="measurement-item">
                                <div className="measurement-icon">📏</div>
                                <span className="measurement-value">Altura: {sensorData.altura} cm</span>
                            </li>
                            <li className="measurement-item">
                                <div className="measurement-icon">🌡️</div>
                                <span className="measurement-value">Temperatura: {sensorData.temperaturaCorporal} °C</span>
                            </li>
                            <li className="measurement-item">
                                <div className="measurement-icon">💨</div>
                                <span className="measurement-value">Frecuencia Respiratoria: {sensorData.frecuenciaRespiratoria}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="buttons-section">
                    <button className="save-button" onClick={handleSave}>Guardar</button>
                    <button className="next-button" onClick={handleNext}>Siguiente</button>
                    <button
                        className="stats-button"
                        onClick={() => navigate('/stats')}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            padding: '10px',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        📊
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
