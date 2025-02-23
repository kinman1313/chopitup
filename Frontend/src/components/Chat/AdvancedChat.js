// src/components/Chat/AdvancedChat.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSocket } from '../../context/SocketContext';
import ChatBubble from './ChatBubble';
import VoiceRecorder from './VoiceRecorder';
import EmojiPicker from 'emoji-picker-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { GlassContainer } from '../GlassContainer';
import { LoadingProvider, useLoading } from '../../context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner';
import styled from 'styled-components';
import { ReactMediaRecorder } from 'react-media-recorder';

const ChatContainer = styled.div`
  overflow-y: auto;
  max-height: 70vh;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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

const AdvanceChat = () => {
  return (
    <div>
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

const AdvancedChat = ({ roomId }) => {
  const { isLoading } = useContext(LoadingContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  const gf = new GiphyFetch('YOUR_API_KEY');

  const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });

  const sendMessage = async () => {
    if (input.trim()) {
      setIsSending(true);
      try {
        await socket.emit('sendMessage', { content: input, room: roomId });
        setInput('');
      } catch (err) {
        console.error(err);
      } finally {
        setIsSending(false);
      }
    }
  };

  const sendVoiceMessage = (audioFile) => {
    socket.emit('sendMessage', { content: audioFile, room: roomId, isVoiceMessage: true });
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', { roomId });

    socket.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => socket.off('newMessage');
  }, [socket, roomId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <GlassContainer>
      <ChatContainer>
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} isUser={msg.sender === socket.id} />
        ))}
        <div ref={messagesEndRef} />
      </ChatContainer>
      <InputContainer>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={sendMessage} disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </Button>
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
        <button onClick={() => setShowGiphy(!showGiphy)}>GIF</button>
        <VoiceRecorder onStop={sendVoiceMessage} />
      </InputContainer>
      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={(emoji) => setInput(input + emoji.emoji)} />
      )}
      {showGiphy && (
        <Grid fetchGifs={fetchGifs} width={800} columns={3} gutter={6} onGifClick={(gif) => setInput(input + gif.embed_url)} />
      )}
    </GlassContainer>
  );
};

AdvancedChat.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default AdvancedChat;
