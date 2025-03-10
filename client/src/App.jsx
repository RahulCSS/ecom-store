import React from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Vendor from './pages/Vendor'
import Delivery from './pages/Delivery'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Wishlist from './pages/Wishlist'
import MyAccount from './pages/MyAccount'

const App = () => {
  return (
    <div className="bg-[--bgColor] m-auto">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  )
}

export default App
