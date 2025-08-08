import React from "react";
import { SiCssdesignawards } from "react-icons/si";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-primaryColor text-white py-3 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 fixed top-0 right-0 left-0">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer ">
        <p>
          <SiCssdesignawards />
        </p>
        <p className="tracking-wider text-3xl sm:5xl font-bold">LMS</p>
      </div>
      {/* User */}
      <div className="flex items-center gap-3 cursor-pointer">
        <p>MJA Ahamed</p>
        <p className="text-lg">
          <FaUser />
        </p>
      </div>
    </div>
   
  );
};

export default Navbar;
