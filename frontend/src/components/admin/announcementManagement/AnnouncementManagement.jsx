import React from 'react'
import { PiMicrophoneStageBold } from "react-icons/pi";
import { RiMic2AiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';



const AnnouncementManagement = () => {
  const navigate = useNavigate()

  return (
    <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4  sm:gap-8">
      <div onClick={()=>{ navigate('/admin/announcement-management/add-announcement'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#D92C54] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <PiMicrophoneStageBold className="text-6xl " />
        </p>
        <h1 className="text-2xl">Add Announcement</h1>
      </div>
      <div onClick={()=>{ navigate('/admin/announcement-management/view-announcements'); window.scrollTo(0,0)}} className="flex items-center gap-4 p-4 md:p-8 bg-[#2F5249] text-white rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transform transition-all ease-linear">
        <p>
          <RiMic2AiFill className="text-6xl " />
        </p>
        <h1 className="text-2xl">View Announcements</h1>
      </div>
    </div>
  )
}

export default AnnouncementManagement
