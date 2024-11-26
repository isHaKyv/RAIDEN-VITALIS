import React from 'react';
import '../styles/Alerts.css';

const Alerts = ({ patientFiles }) => {
    const alerts = patientFiles.filter((file) => file.needsAttention);

    return (
        <div className="alerts-container">
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id}>
                            <strong>Name:</strong> {alert.fullName} <br />
                            <strong>Reason:</strong> Requires medical attention.
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No alerts available.</p>
            )}
        </div>
    );
};

export default Alerts;
