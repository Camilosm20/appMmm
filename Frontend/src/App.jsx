import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import WpService from "./pages/wpService"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WpService />} />
      </Routes>
    </Router>
  )
}

export default App
