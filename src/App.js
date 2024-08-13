import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css'
import HomePage from './components/HomePage'
import Board from './components/Board'

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/board" element={<Board/>}/>
      </Routes>
    </Router>
    </>
  )
}
