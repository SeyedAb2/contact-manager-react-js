import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'


import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "react-confirm-alert/src/react-confirm-alert.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="contact-manager-react-js">
      <App />
    </BrowserRouter>
  </StrictMode>
)
