import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { GrAnnounce } from "react-icons/gr";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate()
  return (
    <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4  sm:gap-8">
      <div onClick={()=>{ navigate('/admin/student-management'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#D92C54] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <PiStudentBold className="text-6xl " />
        </p>
        <h1 className="text-2xl">Student Management</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/lecturer-management'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#FF7A30] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <GiTeacher className="text-6xl " />
        </p>
        <h1 className="text-2xl">Lecturer Management</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/course-management'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#3E5F44] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <FaBookOpen className="text-6xl " />
        </p>
        <h1 className="text-2xl">Course Management</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/announcement-management'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#113F67] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <GrAnnounce className="text-6xl " />
        </p>
        <h1 className="text-2xl">Announcement Management</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/payment-management'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#E14434] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <MdOutlinePayment className="text-6xl " />
        </p>
        <h1 className="text-2xl">Payment Management</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
