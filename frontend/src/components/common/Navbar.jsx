import React from 'react'
import { SiCssdesignawards } from "react-icons/si";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-primaryColor text-white py-3 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
      {/* Logo */}
      <div className='flex items-center gap-3'>
        <p>
            <SiCssdesignawards />
        </p>
        <p className='tracking-wider text-3xl sm:5xl font-bold'>LMS</p>
      </div>
    </div>
  )
}

export default Navbar
