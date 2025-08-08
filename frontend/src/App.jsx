import React from 'react'
import { Route, Routes } from "react-router-dom"
import Navbar from './components/common/Navbar'
import StudentLayout from './layout/StudentLayout'
import StudentDashboard from './pages/StudentDashboard'

const App = () => {
  return (
    <div>
      <Navbar />

    <Routes>
      <Route path='/student' element={<StudentLayout />}  >
    <Route index element={<StudentDashboard />} />
      </Route>
    </Routes>

    </div>
  )
}

export default App
