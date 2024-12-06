import React from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './pages/NavBar'
import Home from './pages/Home'

const App = () => {
  return (
    <div className="bg-[--bgColor] m-auto">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
