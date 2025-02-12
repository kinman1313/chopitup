// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createRoom = async (name) => {
    try {
        const response = await api.post('/rooms', { name });
        return response.data;
    } catch (error) {
        console.error('Error creating room:', error);
        throw error;
    }
};

export const sendMessage = async (roomId, content, isVoiceMessage = false) => {
    try {
        const response = await api.post('/messages', { roomId, content, isVoiceMessage });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getRoomMessages = async (roomId) => {
    try {
        const response = await api.get(`/rooms/${roomId}/messages`);
        return response.data;
    } catch (error) {
        console.error('Error getting room messages:', error);
        throw error;
    }
};

export const inviteUser = async (roomId, userId) => {
    try {
        const response = await api.post('/rooms/invite', { roomId, userId });
        return response.data;
    } catch (error) {
        console.error('Error inviting user:', error);
        throw error;
    }
};

export const updateUserSettings = async (settings) => {
    try {
        const response = await api.put('/user/settings', settings);
        return response.data;
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error('Error getting profile:', error);
        throw error;
    }
};

export default api;
