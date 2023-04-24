import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {




  return (
    <div className="App">
      <Routes>
        <Route path='/:mesa' element={<Home />} />
        <Route path='/login/:mesa' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
