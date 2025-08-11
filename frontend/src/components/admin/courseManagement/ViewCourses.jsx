import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import Loading from "../../common/Loading";
import { assignLecturerToCourse, cancelLecturerAssignment } from "../../../service/adminCourse";
import toast from "react-hot-toast";

const ViewCourses = () => {
  const { loading, courses, faculties, lecturers, setLoading } =
    useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);

  // Get departments for dropdown
  const departments = useMemo(() => {
    if (selectedFaculty) {
      const facultyObj = faculties.find((f) => f.name === selectedFaculty);
      return facultyObj?.departments || [];
    }
    // If no faculty selected, show all departments from all faculties
    return faculties.flatMap((f) => f.departments);
  }, [selectedFaculty, faculties]);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.courseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFaculty = selectedFaculty
      ? course.faculty === selectedFaculty
      : true;
    const matchesDepartment = selectedDepartment
      ? course.department === selectedDepartment
      : true;
    return matchesSearch && matchesFaculty && matchesDepartment;
  });

  // Get lecturers for the selected course's faculty
  const getFacultyLecturers = (courseFaculty) => {
    return lecturers.filter((lecturer) => lecturer.faculty === courseFaculty);
  };

  const handleAssignClick = (course) => {
    setSelectedCourse(course);
    setSelectedLecturerId(null); // Reset selected lecturer when opening popup
    setShowPopup(true);
  };

  const handleAssignLecturer = async () => {
    if (!selectedLecturerId) {
      toast.error("Please select a lecturer first");
      return;
    }

    try {
      setLoading(true);
      const result = await assignLecturerToCourse({
        courseId: selectedCourse.id,
        lecturerId: selectedLecturerId
      });
      
      if (result.success) {
    
        setShowPopup(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign lecturer");
      console.error("Assignment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAssignment = async (courseId) => {
    try {
      const result = await cancelLecturerAssignment(courseId);
      if (result.success) {
        toast.success(result.message);
        // Update your course list in state/context
      }
    } catch (error) {
      console.error("Cancellation error:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedLecturerId(null);
    setSelectedCourse(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-12">
      {/* Search and filter controls */}
      <div className="flex flex-col gap-4 lg:flex-row mb-8">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primaryColor focus:border-primaryColor"
          />
        </div>

        {/* Filter by Faculty */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">
            Filter by Faculty
          </label>
          <select
            value={selectedFaculty}
            onChange={(e) => {
              setSelectedFaculty(e.target.value);
              setSelectedDepartment("");
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primaryColor focus:border-primaryColor"
          >
            <option value="">All Faculties</option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Department */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">
            Filter by Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primaryColor focus:border-primaryColor"
          >
            <option value="">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.department}>
                {dept.department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {filteredCourses.length > 0 && (
          <p className="text-sm  mb-4">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </p>
        )}
      </div>

      {/* Course Table */}
      <div>
        {filteredCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-start">Course Name</th>
                  <th className="py-2 px-4 border-b text-start">Course Code</th>
                  <th className="py-2 px-4 border-b text-start">Faculty</th>
                  <th className="py-2 px-4 border-b text-start">Department</th>
                  <th className="py-2 px-4 border-b text-start">Lecturer</th>
                  <th className="py-2 px-4 border-b text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{course.courseName}</td>
                    <td className="py-2 px-4 border-b">{course.courseCode}</td>
                    <td className="py-2 px-4 border-b">{course.faculty}</td>
                    <td className="py-2 px-4 border-b">{course.department}</td>
                    {
                      course.lecturer ? (
                        <td className="py-2 px-4 border-b">
                        { course.lecturer ? course.lecturer.name: "Not Assigned"}
                      </td>
                      ) : <td className="py-2 px-4 border-b">
<button className="text-center px-2 py-1 text-sm bg-red-500 text-white rounded-full">
                        Not Assigned
</button>
                      </td>
                    }
                   
                    <td className="py-2 px-4 border-b">
                      {
                        course.lecturer ? (
                         <button onClick={()=>handleCancelAssignment(course.id)} className="bg-red-500 text-sm text-white px-2 py-1 rounded hover:bg-red-300 duration-300 transition-all ease-linear cursor-pointer">
                          Cancel
                         </button>
                        ) : (
                          <button
                          onClick={() => handleAssignClick(course)}
                          className="bg-primaryColor text-sm text-white px-2 py-1 rounded hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer"
                        >
                          Assign Lecturer
                        </button>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No courses found.</p>
          </div>
        )}
      </div>

      {/* Popup Display */}
      {selectedCourse && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center ${
            showPopup ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-[500px] w-full mx-4 sm:m-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Assign Lecturer to {selectedCourse.courseName}
              </h2>
              <button
                onClick={handleClosePopup}
                className="cursor-pointer font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col w-full gap-2 mt-4">
              <label>Select Lecturer from {selectedCourse.faculty}</label>
              <select
                className="p-2 border border-slate-200 rounded-md"
                value={selectedLecturerId || ""}
                onChange={(e) => setSelectedLecturerId(e.target.value)}
              >
                <option value="">--Select Lecturer--</option>
                {getFacultyLecturers(selectedCourse.faculty).map(
                  (lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.name} ({lecturer.department})
                    </option>
                  )
                )}
              </select>
            </div>
            <button
              onClick={handleAssignLecturer}
              disabled={!selectedLecturerId || loading}
              className={`mt-6 bg-primaryColor text-sm text-white w-full py-2 rounded hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer ${
                !selectedLecturerId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Assigning..." : "Assign Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;