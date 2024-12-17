import React from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Vendor from './pages/Vendor'
import Delivery from './pages/Delivery'
import Cart from './pages/Cart'

const App = () => {
  return (
    <div className="bg-[--bgColor] m-auto">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
