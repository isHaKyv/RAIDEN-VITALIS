import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Line } from 'react-chartjs-2';
import '../styles/AddData.css';

const AddData = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const savedData = location.state?.savedData || {};

    // State for personal details
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        age: '',
        gender: '',
        maritalStatus: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDOBChange = (e) => {
        const dob = e.target.value;
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        setFormData((prev) => ({ ...prev, dob, age }));
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text('Patient Report', 105, 20, null, null, 'center');

        pdf.setFontSize(12);

        // Add personal details
        pdf.text('Full Name:', 20, 40);
        pdf.text(formData.fullName || 'N/A', 60, 40);

        pdf.text('Date of Birth:', 20, 50);
        pdf.text(formData.dob || 'N/A', 60, 50);

        pdf.text('Age:', 20, 60);
        pdf.text(formData.age || 'N/A', 60, 60);

        pdf.text('Gender:', 20, 70);
        pdf.text(formData.gender || 'N/A', 60, 70);

        pdf.text('Marital Status:', 20, 80);
        pdf.text(formData.maritalStatus || 'N/A', 60, 80);

        pdf.text('Address:', 20, 90);
        pdf.text(formData.address || 'N/A', 60, 90);

        // Add sensor data
        pdf.text('Sensor Data:', 20, 110);
        pdf.text(`Peso: ${savedData.peso || 'N/A'} kg`, 30, 120);
        pdf.text(`Altura: ${savedData.altura || 'N/A'} cm`, 30, 130);
        pdf.text(`Temperatura: ${savedData.temperaturaCorporal || 'N/A'} °C`, 30, 140);
        pdf.text(`Frecuencia Respiratoria: ${savedData.frecuenciaRespiratoria || 'N/A'}`, 30, 150);

        // Add charts for each sensor metric
        const chartCanvas = document.querySelectorAll('.chart canvas');
        chartCanvas.forEach((canvas, index) => {
            if (canvas) {
                const chartImage = canvas.toDataURL('image/png');
                pdf.addImage(chartImage, 'PNG', 20, 160 + index * 60, 170, 50);
            }
        });

        pdf.save(`${formData.fullName || 'Patient'}_Report.pdf`);
    };

    const generateChartData = (label, data, color) => ({
        labels: ['T1', 'T2', 'T3'],
        datasets: [
            {
                label,
                data: [data],
                borderColor: color,
                backgroundColor: `${color}33`, // Add transparency for background
                borderWidth: 2,
                tension: 0.4, // Smooth line
                fill: true,
            },
        ],
    });

    return (
        <div className="add-data-container">
            <h2>Complete Patient Details</h2>
            <form className="add-data-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleDOBChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" value={formData.age} readOnly />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Marital Status</label>
                    <input
                        type="text"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
            </form>

            <h2>Saved Sensor Data</h2>
            <ul>
                <li>Peso: {savedData.peso} kg</li>
                <li>Altura: {savedData.altura} cm</li>
                <li>Temperatura Corporal: {savedData.temperaturaCorporal} °C</li>
                <li>Frecuencia Respiratoria: {savedData.frecuenciaRespiratoria}</li>
            </ul>

            <h3>Graphs</h3>
            <div className="chart-grid">
                <div className="chart-item">
                    <h4>Peso (Weight)</h4>
                    <Line data={generateChartData('Peso (kg)', savedData.peso, 'red')} />
                </div>
                <div className="chart-item">
                    <h4>Altura (Height)</h4>
                    <Line data={generateChartData('Altura (cm)', savedData.altura, 'blue')} />
                </div>
                <div className="chart-item">
                    <h4>Temperatura (Body Temp)</h4>
                    <Line
                        data={generateChartData('Temperatura (°C)', savedData.temperaturaCorporal, 'green')}
                    />
                </div>
                <div className="chart-item">
                    <h4>Frecuencia Respiratoria (Resp Rate)</h4>
                    <Line
                        data={generateChartData(
                            'Frecuencia Respiratoria',
                            savedData.frecuenciaRespiratoria,
                            'orange'
                        )}
                    />
                </div>
            </div>

            <div className="action-buttons">
                <button onClick={generatePDF}>Generate PDF</button>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
};

export default AddData;
