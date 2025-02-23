import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import GlobalStyle from './GlobalStyle';
import Menu from './components/Menu'; // Import Menu component
import AdvancedChat from './components/Chat/AdvancedChat'; // Correct path
import SimpleChat from './components/Chat/SimpleChat'; // Correct path
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Invite from './components/Invite';
import Rooms from './components/Rooms';
import DMs from './components/DMs';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword'; // Import ForgotPassword component
import { LoadingProvider } from './context/LoadingContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
    return (
        <LoadingProvider>
            <AuthProvider>
                <SocketProvider>
                    <GlobalStyle />
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} /> {/* Register Route */}
                        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Route */}
                        <Route path="/advanced-chat" element={<AdvancedChat />} /> {/* Correct element */}
                        <Route path="/simple-chat" element={<SimpleChat />} /> {/* Correct path */}
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/invite" element={<Invite />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/dms" element={<DMs />} />
                    </Routes>
                </SocketProvider>
            </AuthProvider>
        </LoadingProvider>
    );
}

export default App;
