import { io } from 'socket.io-client';

const token = localStorage.getItem('token');

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
    auth: { token },
    withCredentials: true,
    reconnectionAttempts: 5,  // Number of attempts to reconnect
    reconnectionDelay: 1000   // Delay between each reconnection attempt
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

socket.on('reconnect_attempt', () => {
    console.log('Reconnecting...');
});

export default socket;
