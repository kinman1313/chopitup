// src/components/Chat/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import ChatBubble from '../ChatBubble';
import VoiceRecorder from '../VoiceRecorder';
import EmojiPicker from 'emoji-picker-react';
import GiphySearch from 'react-giphy-searchbox';
import { GlassContainer } from '../GlassContainer';

const Chat = () => {
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
