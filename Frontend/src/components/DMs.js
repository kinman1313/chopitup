// src/components/DMs.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdvancedChat from './Chat/AdvancedChat'; // Corrected path
import SimpleChat from './SimpleChat'; // Corrected path
import Invite from './Invite';
import api from '../api';
import GlassContainer from './GlassContainer';

const DMsContainer = styled(GlassContainer)`
  display: flex;
  height: 100vh;
  flex-direction: row;
`;

const Sidebar = styled(GlassContainer)`
  width: 250px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MainArea = styled(GlassContainer)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  text-align: center;
  font-size: 1.5em;
  color: white;
  margin-bottom: 10px;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DMs = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showInviteForm, setShowInviteForm] = useState(false);

    useEffect(() => {
        // Fetch rooms from backend (example endpoint)
        const fetchRooms = async () => {
            try {
                const response = await api.getRooms(); // Ensure you have this method in your api.js
                setRooms(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRooms();
    }, []);

    const handleSelectRoom = async (roomId) => {
        try {
            const response = await api.getRoomMessages(roomId);
            const room = rooms.find(r => r._id === roomId);
            setSelectedRoom({
                id: roomId,
                name: room ? room.name : '',
                messages: response.data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const toggleInviteForm = () => {
        setShowInviteForm(!showInviteForm);
    };

    return (
        <DMsContainer>
            <Sidebar>
                <div>
                    <h3>Chat Rooms</h3>
                    <ul>
                        {rooms.map((room) => (
                            <li key={room._id} onClick={() => handleSelectRoom(room._id)}>
                                {room.name}
                            </li>
                        ))}
                    </ul>
                    <h3>Actions</h3>
                    <button onClick={toggleInviteForm}>
                        {showInviteForm ? 'Close Invite Form' : 'Invite'}
                    </button>
                </div>
            </Sidebar>
            <MainArea>
                <ChatHeader>{selectedRoom ? `Chat Room: ${selectedRoom.name}` : 'Select a Chat Room'}</ChatHeader>
                {showInviteForm ? (
                    <Invite />
                ) : (
                    <ChatArea>
                        {selectedRoom ? (
                            <AdvancedChat roomId={selectedRoom.id} /> // Using AdvancedChat for chat room
                        ) : (
                            <p>Please select a chat room to start messaging.</p>
                        )}
                    </ChatArea>
                )}
            </MainArea>
        </DMsContainer>
    );
};

export default DMs;
