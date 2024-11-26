import React from 'react';
import '../styles/ContactInfo.css';

const ContactInfo = () => {
    return (
        <section className="contact-info" id="contacto">
            <div className="location">
                <h3>UMF #25 IMSS</h3>
                <p>Dirección: Av. Paseo de la Reforma 123, Ciudad de México.</p>
                <p>Teléfono: (555) 123-4567</p>
            </div>
            <div className="schedule">
                <h3>Horario</h3>
                <p>Sábado: Cerrado</p>
                <p>Domingo: Cerrado</p>
                <p>Lunes - Viernes: 7:30 a.m. - 8:00 p.m.</p>
            </div>
        </section>
    );
}

export default ContactInfo;
