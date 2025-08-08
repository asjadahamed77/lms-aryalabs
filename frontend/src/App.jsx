import React from 'react'
import { Route, Routes } from "react-router-dom"
import Navbar from './components/common/Navbar'
import StudentLayout from './layout/StudentLayout'
import StudentDashboard from './pages/StudentDashboard'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <div>
      <Navbar />

    <div className='mt-[60px]'>
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='/student' element={<StudentLayout />}  >
    <Route index element={<StudentDashboard />} />
      </Route>
    </Routes>
    </div>

    </div>
  )
}

export default App
