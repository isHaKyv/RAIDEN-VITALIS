import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Quote from './components/Quote';
import ContactInfo from './components/ContactInfo';
import Directory from './components/Directory';
import Analysis from './components/Analysis';
import Contact from './components/contact';
import Statistics from './components/Statistics';
import PatientForm from './components/PatientForm';
import AddFile from './components/AddFile';
import DeleteFile from './components/DeleteFile';
import Alerts from './components/Alerts';
import Records from './components/Records';
import RecordDetails from './components/RecordDetails';
import AddData from './components/AddData';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
    // Centralized state for patient files
    const [patientFiles, setPatientFiles] = useState([
        { id: 1, fullName: 'John Doe', dob: '1990-01-01', age: 32, needsAttention: false },
        { id: 2, fullName: 'Jane Smith', dob: '1985-05-15', age: 37, needsAttention: true },
    ]);

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]); // Store registered users

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                     <Route
                        path="/estadisticas"
                        element={<Statistics patientFiles={patientFiles} />}
                    />

                    {/* Authentication */}
                    <Route
                        path="/login"
                        element={<Login users={users} setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route
                        path="/register"
                        element={<Register users={users} setUsers={setUsers} />}
                    />

                    {/* Main Page */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <Services />
                                <Quote />
                                <ContactInfo />
                            </>
                        }
                    />

                    {/* Directory Section */}
                    <Route path="/directorio" element={<Directory />} />

                    {/* Analysis and Statistics */}
                    <Route
                        path="/analisis"
                        element={
                            isAuthenticated ? (
                                <Analysis />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route path="/estadisticas" element={<Statistics />} />

                    {/* Contact */}
                    <Route path="/contacto" element={<Contact />} />

                    {/* Patient Data Collection */}
                    <Route path="/paciente" element={<PatientForm />} />

                    {/* File Management */}
                    <Route
                        path="/add-file"
                        element={<AddFile patientFiles={patientFiles} setPatientFiles={setPatientFiles} />}
                    />
                    <Route
                        path="/delete-file"
                        element={<DeleteFile patientFiles={patientFiles} setPatientFiles={setPatientFiles} />}
                    />

                    {/* Alerts Section */}
                    <Route
                        path="/alerts"
                        element={<Alerts patientFiles={patientFiles} />}
                    />

                    {/* Records Section */}
                    <Route
                        path="/records"
                        element={<Records patientFiles={patientFiles} />}
                    />
                    <Route
                        path="/records/:id"
                        element={<RecordDetails patientFiles={patientFiles} />}
                    />

                    {/* Add Data Section */}
                    <Route
                        path="/add-data"
                        element={<AddData setPatientFiles={setPatientFiles} patientFiles={patientFiles} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
