// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SocketProvider } from './context/SocketContext';

ReactDOM.render(
    <SocketProvider>
        <App />
    </SocketProvider>,
    document.getElementById('root')
);
