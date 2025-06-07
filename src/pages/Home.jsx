import React from 'react'
import Homeright from '../components/Homeright'
import { OwnershipProvider } from '../context/OwnershipContext'

function Home() {
  return (
    <div>
      <OwnershipProvider>
        <Homeright />
      </OwnershipProvider>
    </div>
  )
}

export default Home