import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import LOGO from '../assets/IMSS_Logosímbolo.png'; 
import LOGO2 from '../assets/RAIDEN.png'; 

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="logo">
                {/* Wrapping both logos with <Link> to redirect to the homepage */}
                <Link to="/" className="logo-link">
                    <img src={LOGO2} alt="Logo 1" />
                </Link>
                <Link to="/" className="logo-link">
                    <img src={LOGO} alt="Logo 2" />
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/directorio">Directorios</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                    <li><Link to="/analisis" className="button">Análisis</Link></li>
                    <li><Link to="/estadisticas">Estadísticas</Link></li>
                    <li><Link to="/alerts">Alertas</Link></li>
                    <li><Link to="/records">Registros</Link></li>
                    <li><Link to="/add-file">Agregar Archivo</Link></li>
                    <li><Link to="/delete-file">Eliminar Archivo</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
