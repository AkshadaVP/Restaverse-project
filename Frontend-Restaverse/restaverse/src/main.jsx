import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider 
      domain="dev-0yn2u7tt20qp8ojl.us.auth0.com"
      clientId="qGoa2mH40u2GhszamFEe76OhJn3EA6TZ"
      authorizationParams={{
      redirect_uri: window.location.origin}}
    >
    <App />
    </Auth0Provider>
    
  </StrictMode>,
)
