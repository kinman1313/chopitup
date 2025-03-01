// src/Settings.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure this import is correct
import styled, { keyframes } from 'styled-components';
import { GlassContainer } from '../components/GlassContainer'; // Ensure this import is correct
import { updateUserSettings, getUserProfile } from '../api'; // Ensure these functions are defined

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const SettingsPanel = styled(GlassContainer)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 20px;
  animation: ${slideIn} 0.3s ease-in-out;
`;

export default function Settings() {
  return (
    <SettingsPanel>
      {/* Settings UI */}
    </SettingsPanel>
  );
}

const Settings = () => {
  const { user, setUser } = useAuth();
  const [settings, setSettings] = useState(user.settings || { chatBubble: 'rounded', colorScheme: '#ffffff', bubbleColor: '#2196F3' });

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile);
      setSettings(profile.settings);
    };

    fetchProfile();
  }, [setUser]);

  // Handle save button click to update user settings
  const handleSave = async () => {
    try {
      const updatedUser = await updateUserSettings(settings);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <SettingsPanel>
      <h2>Settings</h2>
      <label>Chat Bubble Style</label>
      <select
        value={settings.chatBubble}
        onChange={(e) => setSettings({ ...settings, chatBubble: e.target.value })}
      >
        <option value="rounded">Rounded</option>
        <option value="square">Square</option>
      </select>
      <label>Color Scheme</label>
      <input
        type="color"
        value={settings.colorScheme}
        onChange={(e) => setSettings({ ...settings, colorScheme: e.target.value })}
      />
      <label>Bubble Color</label>
      <input
        type="color"
        value={settings.bubbleColor}
        onChange={(e) => setSettings({ ...settings, bubbleColor: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
    </SettingsPanel>
  );
};

export default Settings;
