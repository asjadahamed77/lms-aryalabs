import React from 'react'
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaUserGroup } from "react-icons/fa6";



const StudentManagement = () => {
  const navigate = useNavigate()

  return (
    <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4  sm:gap-8">
      <div onClick={()=>{ navigate('/admin/student-management/add-student'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#D92C54] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <IoPersonAdd className="text-6xl " />
        </p>
        <h1 className="text-2xl">Add Student</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/student-management/view-students'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#2F5249] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <FaUserGroup className="text-6xl " />
        </p>
        <h1 className="text-2xl">View Students</h1>
      </div>
    </div>
  )
}

export default StudentManagement
