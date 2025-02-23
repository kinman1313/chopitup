// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/chat');
        } catch (err) {
            console.error('Login failed', err);
        }
    };

  return (
     <div>
       <h2>Login</h2>
       <form onSubmit={handleSubmit}>
         <input
           type="email"
           placeholder="Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
         />
         <input
           type="password"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
         />
         <button type="submit">Login</button>
            </form>
            <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
            <p>Forgot your password? <Link to="/forgot-password">Reset it here</Link></p>
        </div>
    );
};

export default Login;
