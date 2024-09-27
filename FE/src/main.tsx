import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
