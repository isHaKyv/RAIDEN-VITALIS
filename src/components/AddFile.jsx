import React, { useState } from 'react';
import '../styles/AddFile.css';


const AddFile = ({ patientFiles, setPatientFiles }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        age: '',
        sex: '',
        maritalStatus: '',
        address: '',
        generalSensorData: '',
        recentSensorData: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (formData.fullName && formData.dob && formData.sex && formData.maritalStatus && formData.address) {
            const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
            setPatientFiles([
                ...patientFiles,
                { ...formData, id: Date.now(), age: age },
            ]);
            setFormData({
                fullName: '',
                dob: '',
                age: '',
                sex: '',
                maritalStatus: '',
                address: '',
                generalSensorData: '',
                recentSensorData: '',
            });
        } else {
            alert('Por favor, rellena todos la informacion.');
        }
    };

    return (
        <div className="add-file-container">
            <h2>Agregar Archivo de Paciente</h2>
            <form className="add-file-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={(e) => {
                            const dob = e.target.value;
                            const age = new Date().getFullYear() - new Date(dob).getFullYear();
                            setFormData((prev) => ({ ...prev, dob, age }));
                        }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Edad</label>
                    <input type="number" value={formData.age} readOnly />
                </div>
                <div className="form-group">
                    <label>Sexo</label>
                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado Civil</label>
                    <input
                        type="text"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Direcion</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Data General de los Sensores</label>
                    <textarea
                        name="generalSensorData"
                        value={formData.generalSensorData}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Datos mas recientes de los sensores</label>
                    <input
                        type="text"
                        name="recentSensorData"
                        value={formData.recentSensorData}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddFile;
