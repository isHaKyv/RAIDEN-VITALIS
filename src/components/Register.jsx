import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = ({ users, setUsers }) => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (users.some((user) => user.email === formData.email)) {
            alert('Email already registered');
            return;
        }
        // Save new user to state
        setUsers([...users, { email: formData.email, password: formData.password }]);
        alert('Registration successful! Please login.');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
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
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Register;
