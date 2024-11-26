import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ users, setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
        // Validate user credentials
        const user = users.find(
            (user) => user.email === formData.email && user.password === formData.password
        );
        if (user) {
            setIsAuthenticated(true);
            navigate('/analisis');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </form>
        </div>
    );
};

export default Login;
