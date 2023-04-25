import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Monitor from './pages/Monitor'


function App() {




  return (
    <div className="App">
      <Routes>
        <Route path='/:mesa' element={<Home />} />
        <Route path='/login/:mesa' element={<Login />} />
        <Route path='/monitor' element={<Monitor />} />
      </Routes>
    </div>
  )
}

export default App
