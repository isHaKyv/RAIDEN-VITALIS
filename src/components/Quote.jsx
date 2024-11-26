import React from 'react';
import '../styles/Quote.css';

const Quote = () => {
    return (
        <section className="quote">
            <blockquote>
                "La Medicina es la única profesión universal que en todas partes sigue los mismos métodos, actúa con los mismos objetivos y busca los mismos fines."
            </blockquote>
            <p>- Sir William Osler</p>
        </section>
    );
}

export default Quote;