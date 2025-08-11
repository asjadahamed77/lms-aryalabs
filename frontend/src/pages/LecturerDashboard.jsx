import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const LecturerDashboard = () => {
  const { batches } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className='py-12'>
      <div  className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
        {batches.map((batch, index) => (
          <div 
          onClick={() => navigate(`/lecturer/batch-details/${batch.id}`)}
            key={index} 
            className='text-center py-8 text-lg text-white bg-primaryColor/80 font-medium rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transition-all ease-linear hover:bg-primaryColor'
          >
            {batch.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LecturerDashboard
