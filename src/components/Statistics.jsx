import React, { useEffect, useState } from 'react';
import '../styles/Stats.css';

// Utility to generate random mock data
const generateMockData = (min, max, count) => {
    return Array.from({ length: count }, () => parseFloat((Math.random() * (max - min) + min).toFixed(2)));
};

// Calculate mean, median, mode
const calculateStats = (data) => {
    if (data.length === 0) return null;

    const mean =
        data.reduce((sum, value) => sum + value, 0) / data.length;
    const sortedData = [...data].sort((a, b) => a - b);
    const median =
        sortedData.length % 2 === 0
            ? (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2
            : sortedData[Math.floor(sortedData.length / 2)];
    const mode =
        Object.entries(
            data.reduce((acc, value) => {
                acc[value] = (acc[value] || 0) + 1;
                return acc;
            }, {})
        ).sort((a, b) => b[1] - a[1])[0]?.[0] || "No mode";

    return { mean: mean.toFixed(2), median: median.toFixed(2), mode };
};

// Health prediction logic
const healthPrediction = (type, value) => {
    if (value == null) return 'No data available.';
    switch (type) {
        case 'peso':
            if (value > 100) return 'High weight - consider consulting a doctor.';
            if (value < 40) return 'Underweight - consider improving nutrition.';
            return 'Healthy weight.';
        case 'altura':
            if (value < 150) return 'Short stature - normal in some cases.';
            if (value > 200) return 'Tall stature - consider monitoring growth.';
            return 'Normal height.';
        case 'temperaturaCorporal':
            if (value > 38) return 'Fever - consult a doctor.';
            if (value < 36) return 'Low temperature - possible hypothermia.';
            return 'Normal temperature.';
        case 'frecuenciaRespiratoria':
            if (value > 20) return 'Rapid breathing - monitor carefully.';
            if (value < 12) return 'Slow breathing - consult a specialist.';
            return 'Normal breathing rate.';
        default:
            return 'No prediction available.';
    }
};

const Statistics = () => {
    const [mockData, setMockData] = useState({
        peso: [],
        altura: [],
        temperaturaCorporal: [],
        frecuenciaRespiratoria: [],
    });

    // Generate mock data on component mount
    useEffect(() => {
        setMockData({
            peso: generateMockData(30, 120, 20), // Weight in kg
            altura: generateMockData(140, 200, 20), // Height in cm
            temperaturaCorporal: generateMockData(35, 39, 20), // Body temperature in °C
            frecuenciaRespiratoria: generateMockData(10, 25, 20), // Breathing rate in bpm
        });
    }, []);

    const statsPeso = calculateStats(mockData.peso);
    const statsAltura = calculateStats(mockData.altura);
    const statsTemperatura = calculateStats(mockData.temperaturaCorporal);
    const statsRespiratoria = calculateStats(mockData.frecuenciaRespiratoria);

    return (
        <div className="stats-container">
            <h1>Health Statistics</h1>
            <div className="stats-table">
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Mean</th>
                            <th>Median</th>
                            <th>Mode</th>
                            <th>Last Reading</th>
                            <th>Health Prediction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Peso (Weight)</td>
                            <td>{statsPeso?.mean || 'No data'}</td>
                            <td>{statsPeso?.median || 'No data'}</td>
                            <td>{statsPeso?.mode || 'No data'}</td>
                            <td>{mockData.peso.slice(-1)[0] || 'No data'}</td>
                            <td>{healthPrediction('peso', mockData.peso.slice(-1)[0])}</td>
                        </tr>
                        <tr>
                            <td>Altura (Height)</td>
                            <td>{statsAltura?.mean || 'No data'}</td>
                            <td>{statsAltura?.median || 'No data'}</td>
                            <td>{statsAltura?.mode || 'No data'}</td>
                            <td>{mockData.altura.slice(-1)[0] || 'No data'}</td>
                            <td>{healthPrediction('altura', mockData.altura.slice(-1)[0])}</td>
                        </tr>
                        <tr>
                            <td>Temperatura Corporal (Body Temperature)</td>
                            <td>{statsTemperatura?.mean || 'No data'}</td>
                            <td>{statsTemperatura?.median || 'No data'}</td>
                            <td>{statsTemperatura?.mode || 'No data'}</td>
                            <td>{mockData.temperaturaCorporal.slice(-1)[0] || 'No data'}</td>
                            <td>{healthPrediction('temperaturaCorporal', mockData.temperaturaCorporal.slice(-1)[0])}</td>
                        </tr>
                        <tr>
                            <td>Frecuencia Respiratoria (Respiratory Rate)</td>
                            <td>{statsRespiratoria?.mean || 'No data'}</td>
                            <td>{statsRespiratoria?.median || 'No data'}</td>
                            <td>{statsRespiratoria?.mode || 'No data'}</td>
                            <td>{mockData.frecuenciaRespiratoria.slice(-1)[0] || 'No data'}</td>
                            <td>{healthPrediction('frecuenciaRespiratoria', mockData.frecuenciaRespiratoria.slice(-1)[0])}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Statistics;
