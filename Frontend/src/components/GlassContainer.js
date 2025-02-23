// src/components/GlassContainer.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 20px; // Optional: Add padding if needed
  margin: 20px; // Optional: Add margin if needed
`;

const GlassContainerComponent = ({ children }) => {
  return <GlassContainer>{children}</GlassContainer>;
};

GlassContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlassContainerComponent;
