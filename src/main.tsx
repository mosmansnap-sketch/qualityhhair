import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { initializeGSAP } from './utils/gsap-config';

// Initialize GSAP once at app startup
initializeGSAP();

// Simple, reliable mounting - back to basics
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
