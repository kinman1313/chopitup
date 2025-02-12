import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import GlobalStyle from './GlobalStyle';
import Chat from './components/Chat';
import Menu from './components/Menu';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Invite from './components/Invite'; // Make sure this component is created
import Rooms from './components/Rooms'; // Make sure this component is created
import DMs from './components/DMs'; // Make sure this component is created
import { LoadingProvider } from './context/LoadingContext'; // Make sure this component is created

function App() {
    return (
        <LoadingProvider>
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
        </LoadingProvider>
    );
}

export default App;
