import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import GlobalStyle from './GlobalStyle';
import Chat from './components/Chat';
import Menu from './components/Menu';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Invite from './components/Invite'; // You'll need to create this component
import Rooms from './components/Rooms'; // You'll need to create this component
import DMs from './components/DMs'; // You'll need to create this component

function App() {
    return (
        <Router>
            <AuthProvider>
                <SocketProvider>
                    <GlobalStyle />
                    <Menu />
                    <Routes>
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/invite" element={<Invite />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/dms" element={<DMs />} />
                    </Routes>
                </SocketProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
