import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import Loading from '../../common/Loading'

const ViewCourses = () => {
  const {loading, courses, faculties} = useContext(AppContext)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Get departments for dropdown
  const departments = useMemo(() => {
    if (selectedFaculty) {
      const facultyObj = faculties.find((f) => f.name === selectedFaculty);
      return facultyObj?.departments || [];
    }
    // If no faculty selected, show all departments from all faculties
    return faculties.flatMap((f) => f.departments);
  }, [selectedFaculty, faculties]);

  // Filter lecturers
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = selectedFaculty ? course.faculty === selectedFaculty : true;
    const matchesDepartment = selectedDepartment ? course.department === selectedDepartment : true;
    return matchesSearch && matchesFaculty && matchesDepartment;
  });

  if(loading){
    return <Loading />
  }

  return (
    <div className='py-12'>
       <div className="flex flex-col gap-4 lg:flex-row mb-8">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">Search by Name</label>
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
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">Filter by Faculty</label>
          <select
            value={selectedFaculty}
            onChange={(e) => {
              setSelectedFaculty(e.target.value);
              setSelectedDepartment('');
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
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">Filter by Department</label>
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
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{course.courseName}</td>
                    <td className="py-2 px-4 border-b">{course.courseCode}</td>
                    <td className="py-2 px-4 border-b">{course.faculty}</td>
                    <td className="py-2 px-4 border-b">{course.department}</td>
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
    </div>
  )
}

export default ViewCourses
