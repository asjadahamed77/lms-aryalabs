import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarStudent from '../components/students/SidebarStudent';

const StudentLayout = () => {
  

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-4">
      
      <div className='w-64'>
        <SidebarStudent />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
