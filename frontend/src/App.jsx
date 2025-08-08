import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import StudentLayout from "./layout/StudentLayout";
import StudentDashboard from "./pages/StudentDashboard";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerLayout from "./layout/LecturerLayout";
import LecturerDashboard from "./pages/LecturerDashboard";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="mt-[60px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="/lecturer" element={<LecturerLayout />}>
            <Route index element={<LecturerDashboard />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
