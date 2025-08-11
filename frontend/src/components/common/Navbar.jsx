import React, { useContext } from "react";
import { SiCssdesignawards } from "react-icons/si";
import { FaUser } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";



const Navbar = () => {
  const {user,logout} = useContext(AppContext);
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogoClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "student") {
      navigate("/student");
    } else if (user?.role === "lecturer") {
      navigate("/lecturer");
    }else{
      navigate("/login");
    }
  }

  return (
    <div className="flex items-center justify-between bg-primaryColor text-white  px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 fixed top-0 right-0 left-0">
      {/* Logo */}
      <div onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer py-3 ">
        <p>
          <SiCssdesignawards />
        </p>
        <p className="tracking-wider text-3xl sm:5xl font-bold">LMS</p>
      </div>
      {/* User */}
      {
        location.pathname !== "/login" && (
          <div className="relative group">
        <div className="flex items-center gap-3 cursor-pointer py-3">
        <p className="capitalize">{user?.name}</p>
        <p className="text-lg">
          <FaUser />
        </p>
        </div>
        <div className="p-2 w-[180px] text-primaryColor/70 absolute right-0 top-full hidden group-hover:block ">
          <ul className="bg-white rounded-xl w-full border border-slate-200 shadow-2xl">
            <li className="  p-2 hover:text-primaryColor">
              <Link to={'/manage-profile'} className="inline-flex items-center gap-2"> <span>
                <MdManageAccounts className="text-2xl" />
                </span> Manage Profile</Link>
            </li>
            <li onClick={logout}   className=" p-2 hover:text-primaryColor">
              <Link to={'/login'}  className="inline-flex items-center gap-2"> <span>
                <BiLogOut className="text-2xl" />
                </span> Logout</Link>
            </li>
          </ul>
        </div>
      </div>
        )
      }
    </div>
   
  );
};

export default Navbar;
