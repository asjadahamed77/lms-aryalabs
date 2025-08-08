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
import StudentManagement from "./components/admin/studentManagement/StudentManagement";
import LecturerManagement from "./components/admin/lecturerManagement/LecturerManagement";
import PaymentManagement from "./components/admin/paymentManagement/PaymentManagement";
import AnnouncementManagement from "./components/admin/announcementManagement/AnnouncementManagement";
import CourseManagement from "./components/admin/courseManagement/CourseManagement";
import AddStudent from "./components/admin/studentManagement/AddStudent";
import ViewStudents from "./components/admin/studentManagement/ViewStudents";

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
            <Route path="student-management" element={<StudentManagement />} />
            <Route path="student-management/add-student" element={<AddStudent />} />
            <Route path="student-management/view-students" element={<ViewStudents />} />
            <Route path="lecturer-management" element={<LecturerManagement />} />
            <Route path="payment-management" element={<PaymentManagement />} />
            <Route path="announcement-management" element={<AnnouncementManagement />} />
            <Route path="course-management" element={<CourseManagement />} />
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
