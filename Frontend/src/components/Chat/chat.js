// src/components/Chat/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import ChatBubble from '../ChatBubble';
import VoiceRecorder from '../VoiceRecorder';
import EmojiPicker from 'emoji-picker-react';
import GiphySearch from 'react-giphy-searchbox';
import { GlassContainer } from '../GlassContainer';
import { useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner';
// src/components/Chat/Chat.js
import styled from 'styled-components';

const Button = styled.button`
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #1976D2;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Chat = () => {
    return (
        <div>
            <Button onClick={sendMessage}>Send</Button>
        </div>
    );
};

const Chat = () => {
    const { isLoading } = useContext(LoadingContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGiphy, setShowGiphy] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const socket = useSocket();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinRoom', { roomId: room.id });

        socket.on('newMessage', (message) => {
            setMessages((prev) => [...prev, message]);
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        });

        return () => socket.off('newMessage');
    }, [socket]);

    const sendMessage = async () => {
        if (input.trim()) {
            setIsSending(true);
            try {
                await socket.emit('sendMessage', { content: input, room: 'lobby' });
                setInput('');
            } catch (err) {
                console.error(err);
            } finally {
                setIsSending(false);
            }
        }
    };

    const Chat = () => {
        const [isSending, setIsSending] = useState(false);

        const sendMessage = async () => {
            setIsSending(true);
            try {
                await socket.emit('sendMessage', { content: input, room: 'lobby' });
                setInput('');
            } catch (err) {
                console.error(err);
            } finally {
                setIsSending(false);
            }
        };

        return (
            <div>
                <button onClick={sendMessage} disabled={isSending}>
                    {isSending ? 'Sending...' : 'Send'}
                </button>
            </div>
        );
    };

    const sendVoiceMessage = (audioFile) => {
        socket.emit('sendMessage', { content: audioFile, room: 'lobby', isVoiceMessage: true });
    };

    return (
        <GlassContainer>
            <div style={{ overflowY: 'auto', maxHeight: '70vh' }}>
                {messages.map((msg, i) => (
                    <ChatBubble key={i} message={msg} isUser={msg.sender === socket.id} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={sendMessage} disabled={isSending}>
                    {isSending ? 'Sending...' : 'Send'}
                </button>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
                <button onClick={() => setShowGiphy(!showGiphy)}>GIF</button>
                <VoiceRecorder onStop={sendVoiceMessage} />
            </div>
            {showEmojiPicker && (
                <EmojiPicker onEmojiClick={(emoji) => setInput(input + emoji.emoji)} />
            )}
            {showGiphy && (
                <GiphySearch onSelect={(gif) => setInput(input + gif.embed_url)} />
            )}
        </GlassContainer>
    );
};

export default Chat;
