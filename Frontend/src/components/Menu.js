import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  background: #333;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-around;
`;

const MenuItem = styled.div`
  cursor: pointer;
`;

const Menu = () => (
  <MenuContainer>
    <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
      <MenuItem>Login</MenuItem>
    </Link>
    <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
      <MenuItem>Register</MenuItem>
    </Link>
    <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'white' }}>
      <MenuItem>Forgot Password</MenuItem>
    </Link>
    <Link to="/chat" style={{ textDecoration: 'none', color: 'white' }}>
      <MenuItem>Chat</MenuItem>
    </Link>
    <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
      <MenuItem>Profile</MenuItem>
    </Link>
    <Link to="/settings" style={{ textDecoration: 'none', color: 'white' }}>
      <MenuItem>Settings</MenuItem>
    </Link>
  </MenuContainer>
);

export default Menu;
