import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
