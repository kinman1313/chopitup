// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset some basic elements */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Set default font and background */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f8f8;
    color: #333;
    line-height: 1.6;
    padding: 20px;
  }

  /* Customize headings */
  h1, h2, h3, h4, h5, h6 {
    margin: 20px 0 10px;
    font-weight: bold;
  }

  /* Style links */
  a {
    color: #2196F3;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #1976D2;
    }
  }

  /* Default button styles */
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #2196F3;
    color: white;
    transition: background 0.3s ease;

    &:hover {
      background-color: #1976D2;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  /* Additional styles can be added here */
`;

export default GlobalStyle;
