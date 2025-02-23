import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import PropTypes from 'prop-types';

const DirectMessage = ({ userId }) => {
  const [message, setMessage] = useState('');
  const socket = useSocket();

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendDirectMessage', { userId, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h4>Direct Message</h4>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

DirectMessage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DirectMessage;