import React from 'react';
import '../styles/Directory.css';

const Directory = () => {
    return (
        <div className="directory">
            <h2>DIRECTORIO</h2>
            <div className="directory-section">
                <h3>Médico</h3>
                <div className="directory-item">
                    <div className="icon" style={{ backgroundColor: '#6ba3ff' }}>
                        <span>★</span>
                    </div>
                    <p>Diego Ortiz</p>
                </div>
                <div className="directory-item">
                    <div className="icon" style={{ backgroundColor: '#6ba3ff' }}>
                        <span>★</span>
                    </div>
                    <p>Diego Ortiz</p>
                </div>
            </div>

            <div className="directory-section">
                <h3>Developers</h3>
                <div className="directory-item">
                    <div className="icon" style={{ backgroundColor: '#9b59b6' }}>
                        <span>★</span>
                    </div>
                    <p>Diego Ortiz</p>
                </div> 
            </div>
        </div>
    )
}

export default Directory;
