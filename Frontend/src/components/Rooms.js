import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLoading } from '../context/LoadingContext';

const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const RoomList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RoomItem = styled.li`
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchRooms = async () => {
      startLoading();
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      } finally {
        stopLoading();
      }
    };

    fetchRooms();
  }, [startLoading, stopLoading]);

  return (
    <RoomsContainer>
      <h2>Rooms</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <RoomList>
          {rooms.map((room) => (
            <RoomItem key={room._id}>{room.name}</RoomItem>
          ))}
        </RoomList>
      )}
    </RoomsContainer>
  );
};

export default Rooms;
