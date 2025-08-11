import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import AddLecturer from "./components/admin/lecturerManagement/AddLecturer";
import ViewLecturers from "./components/admin/lecturerManagement/ViewLecturers";
import AddCourse from "./components/admin/courseManagement/AddCourse";
import ViewCourses from "./components/admin/courseManagement/ViewCourses";
import AddAnnouncement from "./components/admin/announcementManagement/AddAnnouncement";
import ViewAnnouncement from "./components/admin/announcementManagement/ViewAnnouncement";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";
import ManageProfile from "./components/common/ManageProfile";
import BatchDetails from "./components/lecturer/BatchDetails";
import AddAssignment from "./components/lecturer/assignmentManagement/AddAssignment";
import ViewAssignments from "./components/lecturer/assignmentManagement/ViewAssignments";
import AddQuiz from "./components/lecturer/quizManagement/AddQuiz";
import ViewQuizzes from "./components/lecturer/quizManagement/ViewQuizzes";
import AddResources from "./components/lecturer/resourceManagement/AddResources";
import ViewResources from "./components/lecturer/resourceManagement/ViewResources";

const App = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <Navbar />
      <Toaster />

      <div className="mt-[60px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
        <Routes>
          {!user && <Route path="login" element={<LoginPage />} />}
          <Route path="manage-profile" element={<ManageProfile />} />
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="student-management" element={<StudentManagement />} />
            <Route
              path="student-management/add-student"
              element={<AddStudent />}
            />
            <Route
              path="student-management/view-students"
              element={<ViewStudents />}
            />
            <Route
              path="lecturer-management"
              element={<LecturerManagement />}
            />
            <Route
              path="lecturer-management/add-lecturer"
              element={<AddLecturer />}
            />
            <Route
              path="lecturer-management/view-lecturers"
              element={<ViewLecturers />}
            />

            <Route path="payment-management" element={<PaymentManagement />} />
            <Route
              path="announcement-management"
              element={<AnnouncementManagement />}
            />
            <Route
              path="announcement-management/add-announcement"
              element={<AddAnnouncement />}
            />
            <Route
              path="announcement-management/view-announcements"
              element={<ViewAnnouncement />}
            />
            <Route path="course-management" element={<CourseManagement />} />
            <Route
              path="course-management/add-course"
              element={<AddCourse />}
            />
            <Route
              path="course-management/view-courses"
              element={<ViewCourses />}
            />
          </Route>
          <Route path="/lecturer" element={<LecturerLayout />}>
            <Route index element={<LecturerDashboard />} />
            <Route path="batch-details/:id" element={<BatchDetails />} />
            <Route
              path="batch-details/:id/add-assignment"
              element={<AddAssignment />}
            />
            <Route
              path="batch-details/:id/view-assignment"
              element={<ViewAssignments />}
            />
            <Route path="batch-details/:id/add-quiz" element={<AddQuiz />} />
            <Route
              path="batch-details/:id/view-quiz"
              element={<ViewQuizzes />}
            />
            <Route
              path="batch-details/:id/add-resource"
              element={<AddResources />}
            />
            <Route
              path="batch-details/:id/view-resource"
              element={<ViewResources />}
            />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
