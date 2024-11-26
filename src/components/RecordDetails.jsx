import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecordDetails.css';

const RecordDetails = () => {
    const { id } = useParams();

    // Placeholder data; replace with actual backend/API data
    const record = {
        id: 1,
        fullName: 'John Doe',
        dob: '1990-01-01',
        age: 32,
        sex: 'Male',
        maritalStatus: 'Single',
        address: '123 Main St',
        sensorData: 'Blood pressure: 120/80',
    };

    return (
        <div className="record-details-container">
            <h2>Patient Details</h2>
            <p><strong>Full Name:</strong> {record.fullName}</p>
            <p><strong>Date of Birth:</strong> {record.dob}</p>
            <p><strong>Age:</strong> {record.age}</p>
            <p><strong>Sex:</strong> {record.sex}</p>
            <p><strong>Marital Status:</strong> {record.maritalStatus}</p>
            <p><strong>Address:</strong> {record.address}</p>
            <p><strong>Sensor Data:</strong> {record.sensorData}</p>
        </div>
    );
};

export default RecordDetails;
