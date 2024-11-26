import React, { useState } from 'react';
import '../styles/DeleteFile.css';


const DeleteFile = ({ patientFiles, setPatientFiles }) => {
    const handleDelete = (id) => {
        setPatientFiles(patientFiles.filter((file) => file.id !== id));
    };

    return (
        <div className="delete-file-container">
            <h2>Delete Patient File</h2>
            {patientFiles.length > 0 ? (
                <ul>
                    {patientFiles.map((file) => (
                        <li key={file.id}>
                            <strong>Name:</strong> {file.fullName} <br />
                            <strong>DOB:</strong> {file.dob} <br />
                            <button onClick={() => handleDelete(file.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No records available to delete.</p>
            )}
        </div>
    );
};

export default DeleteFile;
