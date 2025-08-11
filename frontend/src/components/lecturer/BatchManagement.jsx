import React from 'react'
import { MdAssignmentAdd } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import { MdAssignment } from "react-icons/md";
import { GrResources } from "react-icons/gr";

import { useNavigate } from 'react-router-dom';





const BatchManagement = ({batch}) => {
  const navigate = useNavigate()
  return (
    <div className='py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4  sm:gap-8'>
       {/* Add Assignments */}
       <div onClick={()=> navigate(`/lecturer/batch-details/${batch.id}/add-assignment`)} className='flex items-center text-white bg-[#253900] p-4 sm:p-8 rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear gap-4'>
        <p className='text-6xl'>
          <MdAssignmentAdd />
        </p>
        <h1 className='text-2xl'>
          Add Assignments
        </h1>
       </div>
       {/* Add Quizzes */}
       <div onClick={()=> navigate(`/lecturer/batch-details/${batch.id}/add-quiz`)} className='flex items-center text-white bg-[#280A3E] p-4 sm:p-8 rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear gap-4'>
        <p className='text-6xl'>
          <MdQuiz />
        </p>
        <h1 className='text-2xl'>
          Add Quizzes
        </h1>
       </div>
       {/* Add Resourses */}
       <div onClick={()=> navigate(`/lecturer/batch-details/${batch.id}/add-resource`)} className='flex items-center text-white bg-[#273F4F] p-4 sm:p-8 rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear gap-4'>
        <p className='text-6xl'>
          <TiDocumentAdd />
        </p>
        <h1 className='text-2xl'>
          Add Resources
        </h1>
       </div>


      {/* View Assignments */}
      <div onClick={()=> navigate(`/lecturer/batch-details/${batch.id}/view-assignment`)} className='flex items-center text-white bg-[#253900] p-4 sm:p-8 rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear gap-4'>
        <p className='text-6xl'>
          <MdAssignment />
        </p>
        <h1 className='text-2xl'>
          View Assignments
        </h1>
       </div>
       {/* View Quizzes */}
       <div onClick={()=> navigate(`/lecturer/batch-details/${batch.id}/view-quiz`)} className='flex items-center text-white bg-[#280A3E] p-4 sm:p-8 rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear gap-4'>
        <p className='text-6xl'>
          <MdQuiz />
        </p>
        <h1 className='text-2xl'>
          View Quizzes
        </h1>
       </div>
       {/* View Resourses */}
       <div onClick={()=> navigate(`/lecturer/batch-details/${batch.id}/view-resource`)} className='flex items-center text-white bg-[#273F4F] p-4 sm:p-8 rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear gap-4'>
        <p className='text-6xl'>
          <GrResources />
        </p>
        <h1 className='text-2xl'>
          View Resources
        </h1>
       </div>

    </div>
  )
}

export default BatchManagement
