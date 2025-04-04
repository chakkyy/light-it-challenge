import React from 'react';
import ReactDOM from 'react-dom/client';
import { toast } from 'react-hot-toast';
import './index.css';
import App from './App';

const trackError = (error: Error | string, source: string) => {
  if (import.meta.env.DEV) {
    toast.error(`${source}: ${error instanceof Error ? error.message : error}`);
  }
};

window.addEventListener('error', (event) => {
  trackError(event.error, 'Uncaught Error');
});

window.addEventListener('unhandledrejection', (event) => {
  trackError(event.reason, 'Unhandled Promise');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
