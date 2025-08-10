import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../../context/AppContext';
import Loading from '../../common/Loading';
const AssignLecturers = () => {
    const { lecturers, loading, faculties } = useContext(AppContext);

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
  const filteredLecturers = lecturers.filter((lecturer) => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = selectedFaculty ? lecturer.faculty === selectedFaculty : true;
    const matchesDepartment = selectedDepartment ? lecturer.department === selectedDepartment : true;
    return matchesSearch && matchesFaculty && matchesDepartment;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='py-12'>
       <div className="flex flex-col gap-4 lg:flex-row mb-8">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-primaryColor/70 mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="Search lecturers..."
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
    </div>
  )
}

export default AssignLecturers
