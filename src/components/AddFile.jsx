import React, { useState, useEffect, useCallback } from 'react';
import '../styles/AddFile.css';

const AddFile = () => {
    // Constantes para fechas límite (memoizadas para no recalcular)
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaMinima = '1900-01-01';

    // Estado único para todo el formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        edad: '',
        sexo: '',
        domicilio: '',
    });
    const [loading, setLoading] = useState(false);
    const [fechaError, setFechaError] = useState('');

    // Función para calcular edad memoizada con useCallback
    const calcularEdad = useCallback((fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const m = hoy.getMonth() - fechaNac.getMonth();
        
        if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        
        return edad;
    }, []);

    // Actualizar edad cuando cambia la fecha
    useEffect(() => {
        if (formData.fechaNacimiento) {
            const edad = calcularEdad(formData.fechaNacimiento);
            setFormData(prev => ({ ...prev, edad: edad.toString() }));
        }
    }, [formData.fechaNacimiento, calcularEdad]);

    // Función para validar fecha optimizada
    const validarFecha = useCallback((fecha) => {
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        const minDate = new Date(fechaMinima);
        
        if (fechaSeleccionada > hoy) {
            return 'La fecha no puede ser posterior a hoy';
        }
        
        if (fechaSeleccionada < minDate) {
            return 'La fecha no puede ser anterior a 1900';
        }
        
        return '';
    }, [fechaMinima]);

    // Handler para cambios en campos del formulario
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        
        // Si el campo es fecha de nacimiento, validar
        if (name === 'fechaNacimiento') {
            const error = validarFecha(value);
            setFechaError(error);
            
            // Si hay error, no actualizar el estado
            if (error) return;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, [validarFecha]);

    // Handler para abrir el selector de fecha
    const handleCalendarClick = useCallback(() => {
        const dateInput = document.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.showPicker();
        }
    }, []);

    // Handler para guardar optimizado
    const handleSave = useCallback(async () => {
        // Validar fecha si existe
        if (formData.fechaNacimiento) {
            const error = validarFecha(formData.fechaNacimiento);
            if (error) {
                setFechaError(error);
                return;
            }
        }
        
        // Verificar que todos los campos requeridos estén completos
        const camposRequeridos = ['nombre', 'apellidos', 'fechaNacimiento', 'sexo', 'domicilio'];
        const todosCamposCompletados = camposRequeridos.every(campo => formData[campo]);
        
        if (!todosCamposCompletados) {
            alert('Por favor, rellena toda la información requerida.');
            return;
        }
        
        // Proceder con el guardado
        setLoading(true);
        
        try {
            const response = await fetch('https://vitalis.3utilities.com/api/pacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellidos: formData.apellidos,
                    fecha_nacimiento: formData.fechaNacimiento,
                    edad: parseInt(formData.edad, 10),
                    sexo: formData.sexo,
                    domicilio: formData.domicilio,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Paciente agregado exitosamente.');
                // Reiniciar formulario
                setFormData({
                    nombre: '',
                    apellidos: '',
                    fechaNacimiento: '',
                    edad: '',
                    sexo: '',
                    domicilio: '',
                });
                setFechaError('');
            } else {
                alert(data.message || 'Error al guardar el paciente.');
            }
        } catch (error) {
            console.error('Error al guardar el paciente:', error);
            alert('Hubo un error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    }, [formData, validarFecha]);

    return (
        <div className="add-file-container">
            <h2>Agregar Archivo de Paciente</h2>
            <form className="add-file-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                        id="apellidos"
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <div className="date-input-wrapper">
                        <input
                            id="fechaNacimiento"
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            min={fechaMinima}
                            max={fechaActual}
                            required
                            className="date-input"
                        />
                        <button 
                            type="button" 
                            className="calendar-button" 
                            onClick={handleCalendarClick}
                            aria-label="Abrir calendario"
                        >
                            📅
                        </button>
                    </div>
                    {fechaError && <div className="error-message">{fechaError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="edad">Edad</label>
                    <input 
                        id="edad"
                        type="number" 
                        name="edad"
                        value={formData.edad} 
                        readOnly 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sexo">Sexo</label>
                    <select
                        id="sexo"
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="domicilio">Domicilio</label>
                    <textarea
                        id="domicilio"
                        name="domicilio"
                        type="address"
                        value={formData.domicilio}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button 
                    type="button" 
                    onClick={handleSave} 
                    disabled={loading} 
                    className="save-button"
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </form>
        </div>
    );
};

export default AddFile;