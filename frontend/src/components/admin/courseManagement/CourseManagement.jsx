import React from 'react'
import { IoPersonAdd } from "react-icons/io5";
import { BiBookAdd } from "react-icons/bi";
import { MdLibraryBooks } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



const CourseManagement = () => {
  const navigate = useNavigate()

  return (
    <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4  sm:gap-8">
      <div onClick={()=>{ navigate('/admin/course-management/add-course'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#D92C54] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <BiBookAdd className="text-6xl " />
        </p>
        <h1 className="text-2xl">Add Course</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/course-management/view-courses'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#2F5249] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <MdLibraryBooks className="text-6xl " />
        </p>
        <h1 className="text-2xl">View Courses</h1>
      </div>
    </div>
  )
}

export default CourseManagement
