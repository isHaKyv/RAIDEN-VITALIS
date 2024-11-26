import React from 'react';
import '../styles/Hero.css';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
    const navigate = useNavigate();

    const handleAnalysisClick = () => {
        navigate('/analisis');
    };

    return (
        <section className="hero" id="analisis">
            <div className="hero-content">
                <h1>Servicio Médico "Vitalis"</h1>
                <p>Lorem ipsum es simplemente un texto ficticio de la industria de impresión y composición tipográfica.</p>
                <button className="primary-button" onClick={handleAnalysisClick}>Comenzar Análisis</button>
            </div>
        </section>
    );
}

export default Hero;
