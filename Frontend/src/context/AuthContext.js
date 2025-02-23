import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
            const { token, user } = response.data;
            setUser({ ...user, token });
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password });
            const { token, user } = response.data;
            setUser({ ...user, token });
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('token');
        if (storedUser) {
            setUser({ token: storedUser });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
