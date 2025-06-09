import React from 'react'
import AppRoutes from './routes/AppRoutes'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='flex bg-bg h-full'>
      <div className='h-screen lg:ticky top-0'>
        <SideBar />
      </div>
      <div className='w-full'>
        <div className='sticky top-0 bg-bg z-50'>
          <Navbar />
        </div>
        <AppRoutes />
      </div>
    </div>
  )
}

export default App