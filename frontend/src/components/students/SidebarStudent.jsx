import React, { useState } from 'react'
import { IoMenu } from "react-icons/io5";


const SidebarStudent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='w-full '>
        {/* Toggle */}
        <div>
            <button
                className="cursor-pointer hover:bg-gray-100 p-2 rounded md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <IoMenu className="w-6 h-6" />
            </button>
        </div>
        {/* Sidebar contents */}
        <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'} md:w-64 bg-white shadow-lg p-4 transition-all duration-300 ease-in-out`}>
            Sidebar contents go here....
        </div>
    </div>
  )
}

export default SidebarStudent
