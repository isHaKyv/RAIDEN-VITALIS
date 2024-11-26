import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Records.css';


const Records = ({ patientFiles }) => {
    return (
        <div className="records-container">
            <h2>Patient Records</h2>
            {patientFiles.length > 0 ? (
                <ul>
                    {patientFiles.map((file) => (
                        <li key={file.id}>
                            <strong>Name:</strong> {file.fullName} <br />
                            <strong>DOB:</strong> {file.dob} <br />
                            <strong>Age:</strong> {file.age} <br />
                            <strong>Sex:</strong> {file.sex} <br />
                            <strong>Marital Status:</strong> {file.maritalStatus} <br />
                            <strong>Address:</strong> {file.address} <br />
                            <strong>General Sensor Data:</strong> {file.generalSensorData || 'N/A'} <br />
                            <strong>Most Recent Sensor Data:</strong> {file.recentSensorData || 'N/A'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No records available.</p>
            )}
        </div>
    );
};

export default Records;
