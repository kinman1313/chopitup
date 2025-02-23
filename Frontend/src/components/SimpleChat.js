import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlassContainer from '../GlassContainer';
import { useSocket } from '../context/SocketContext';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
`;

const Message = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Chat = () => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socket.off('newMessage');
            };
        }
    }, [socket]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (socket) {
            socket.emit('sendMessage', { text: newMessage });
            setNewMessage('');
        }
    };

    return (
        <GlassContainer>
            <ChatContainer>
                <h2>Chat</h2>
                <div>
                    {messages.map((msg, index) => (
                        <Message key={index}>{msg.text}</Message>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            </ChatContainer>
        </GlassContainer>
    );
};

export default Chat;
