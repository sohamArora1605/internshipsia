import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import { migrateIfNeeded } from './core/localDb'
import { seedData } from './core/seed'
import { initOfflineListeners } from './core/offline'

// Initialize app
migrateIfNeeded()
seedData()
initOfflineListeners()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)