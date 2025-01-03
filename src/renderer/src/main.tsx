import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './assets/index.css'
import { Toaster } from './components/Toast/Toaster'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
)
