/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './components/Pages/login';
import Signup from './components/Pages/signup';
import Home from './components/Pages/home.jsx';
import Analyzer from './components/Pages/Analyzer';

function App() {

  return (
    <>
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
      </Routes>
    </Router>
    </div>

    </>
  )
}

export default App
