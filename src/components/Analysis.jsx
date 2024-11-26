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
        wsPeso.onmessage = (event) => {
            try {
                if (isReceiving) {
                    const data = JSON.parse(event.data);
                    if (data.sensorType === 'peso') {
                        updateSensorData('peso', data.value);
                    }
                }
            } catch (error) {
                console.error('Error processing data from wsPeso:', error);
            }
        };

        wsOtros.onmessage = (event) => {
            try {
                if (isReceiving) {
                    const data = JSON.parse(event.data);
                    if (data.sensorType === 'altura') {
                        updateSensorData('altura', data.value);
                    } else if (data.sensorType === 'temperatura') {
                        updateSensorData('temperaturaCorporal', data.value);
                    }
                }
            } catch (error) {
                console.error('Error processing data from wsOtros:', error);
            }
        };

        wsRespiratoria.onmessage = (event) => {
            try {
                if (isReceiving) {
                    const data = JSON.parse(event.data);
                    if (data.sensorType === 'frecuenciaRespiratoria') {
                        updateSensorData('frecuenciaRespiratoria', data.value);
                    }
                }
            } catch (error) {
                console.error('Error processing data from wsRespiratoria:', error);
            }
        };

        // Cleanup WebSocket connections on component unmount
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
                </div>
            </div>
        </div>
    );
};

export default Analysis;
