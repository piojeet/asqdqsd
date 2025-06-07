import React from 'react'
import AppRoutes from './routes/AppRoutes'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='flex bg-bg h-full'>
      <div className='h-screen'>
        <SideBar />
      </div>
      <div className='w-full'>
        <Navbar />
        <AppRoutes />
      </div>
    </div>
  )
}

export default App