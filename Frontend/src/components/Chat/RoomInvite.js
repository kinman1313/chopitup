// src/components/Chat/RoomInvite.js
import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import PropTypes from 'prop-types';

const RoomInvite = ({ roomId }) => {
  const [email, setEmail] = useState('');
  const socket = useSocket();

  const inviteUser = () => {
    if (email.trim()) {
      socket.emit('inviteUser', { roomId, email });
      setEmail('');
    }
  };

  return (
    <div>
      <h4>Invite User</h4>
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={inviteUser}>Invite</button>
    </div>
  );
};

RoomInvite.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomInvite;
