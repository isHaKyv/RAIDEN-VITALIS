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
import Stats from './components/Stats'; // Route for the new "Estadísticas" button
import Statistics from './components/Statistics'; // For the button in Analysis.jsx
import PatientForm from './components/PatientForm';
import AddFile from './components/AddFile';
import DeleteFile from './components/DeleteFile';
import Alerts from './components/Alerts';
import Records from './components/Records';
import RecordDetails from './components/RecordDetails';
import AddData from './components/AddData';
import Login from './components/Login';
import Register from './components/Register';
import Graficas from './components/Graficas'; // Importamos el componente con su nombre correcto
import './App.css';

function App() {
    const [patientFiles, setPatientFiles] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>

                <Route path="/stats" element={<Stats />} />
                
                <Route path="/estadisticas" element={<Statistics />} />

                {/* Ruta para las gráficas en tiempo real - Asegúrate de que coincida con el Navbar */}
                <Route 
                    path="/graficas-tiempo-real" 
                    element={<Graficas />} 
                />
            
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

                    {/* Analysis */}
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

                    {/* Alerts */}
                    <Route
                        path="/alerts"
                        element={<Alerts patientFiles={patientFiles} />}
                    />

                    {/* Records */}
                    <Route
                        path="/records"
                        element={<Records patientFiles={patientFiles} />}
                    />
                    <Route
                        path="/records/:id"
                        element={<RecordDetails patientFiles={patientFiles} />}
                    />

                    {/* Add Data */}
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