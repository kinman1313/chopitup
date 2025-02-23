import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { LoadingProvider } from './context/LoadingContext';
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary component


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <LoadingProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </LoadingProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
);
