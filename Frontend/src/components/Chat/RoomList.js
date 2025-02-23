import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const socket = useSocket();

  useEffect(() => {
    socket.on('roomList', (rooms) => {
      setRooms(rooms);
    });

    return () => socket.off('roomList');
  }, [socket]);

  const createRoom = () => {
    if (newRoomName.trim()) {
      socket.emit('createRoom', newRoomName);
      setNewRoomName('');
    }
  };

  return (
    <div>
      <h3>Rooms</h3>
      <input
        type="text"
        placeholder="New Room Name"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;