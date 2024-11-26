import React from 'react';
import '../styles/Services.css';

const Services = () => {
    return (
        <section className="services">
            <h2>Nuestro Servicio</h2>
            <div className="services-list">
                {Array(5).fill(0).map((_, index) => (
                    <div key={index} className="service-item">
                        <div className="service-icon">🔹</div>
                        <p>Lorem Ipsum</p>
                    </div>
                ))}
            </div> 
        </section>
    );
}

export default Services;
