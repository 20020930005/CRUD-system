import React from 'react';
import ReactDOM from 'react-dom/client'; // Change import to 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Use ReactDOM.createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);



