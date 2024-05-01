import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import QrCode from './component/qrcode';
import QrTablList from './component/qrTablList';
import Dashboard from './component/Dashboard';

export default function App() {


  // const handleProps = (data) => {
  //   console.log("Hnadhe props :-", data)
  //   setName(data)
  // }
  return (

    <BrowserRouter>
      <Dashboard />
      <Routes>

        <Route path="/qrapp" element={<QrCode />} />
        <Route path="/qrapp/:id" element={<QrCode />} />
        <Route path="/qrlist" element={<QrTablList />} />

      </Routes>
    </BrowserRouter>

  )
}

