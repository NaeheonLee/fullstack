import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/**
 * Application entry point.
 * Bootstraps the React application and attaches it to the HTML DOM.
 */

// Initialize the React root and render the main App component wrapped in StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);