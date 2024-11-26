import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/PatientForm.css';

const PatientForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        gender: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const generatePDF = async () => {
        const input = document.getElementById('pdf-content');
        const doc = new jsPDF('p', 'mm', 'a4');

        await html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        });

        doc.save('Patient_Report.pdf');
    };

    const handleNext = () => {
        // Placeholder for additional actions after the form
        navigate('/'); // Redirect to home or another route
    };

    return (
        <div className="patient-form-container" id="pdf-content">
            <h2>Patient Information</h2>
            <form className="patient-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-buttons">
                    <button type="button" onClick={generatePDF}>
                        Generate PDF
                    </button>
                    <button type="button" onClick={handleNext}>
                        Finish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
