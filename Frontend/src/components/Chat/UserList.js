import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('userList', (users) => {
      setUsers(users);
    });

    return () => socket.off('userList');
  }, [socket]);

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;