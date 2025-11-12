import { createRoot } from 'react-dom/client'
import './index.css'
import 'bulma/css/bulma.min.css'
import 'scss/styles.scss'
import App from './App.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
