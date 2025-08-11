import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../../context/AppContext';
import Loading from '../../common/Loading';

const ViewLecturers = () => {
  const { lecturers, loading, faculties } = useContext(AppContext);

  console.log(lecturers);
  

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
    <div className="py-12">
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

      <div>
        {filteredLecturers.length > 0 && (
          <p className="text-sm  mb-4">
            Showing {filteredLecturers.length} {filteredLecturers.length === 1 ? 'lecturer' : 'lecturers'}
          </p>
        )}
      </div>

      {/* Lecturers Table */}
      <div>
        {filteredLecturers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-start">Name</th>
                  <th className="py-2 px-4 border-b text-start">Email</th>
                  <th className="py-2 px-4 border-b text-start">Faculty</th>
                  <th className="py-2 px-4 border-b text-start">Department</th>
                  <th className="py-2 px-4 border-b text-start">Course</th>
                </tr>
              </thead>
              <tbody>
                {filteredLecturers.map((lecturer) => (
                  <tr key={lecturer.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{lecturer.name}</td>
                    <td className="py-2 px-4 border-b">{lecturer.email}</td>
                    <td className="py-2 px-4 border-b">{lecturer.faculty}</td>
                    <td className="py-2 px-4 border-b">{lecturer.department}</td>
                   <td className='py-2 px-4 border-b'>
                   {
                    lecturer.courses.length>0 ?  lecturer.courses.map((lecturer,index)=>(
                        <p key={index} className="">
                          <p>{lecturer.name} - {lecturer.code}</p>
                        </p>
                      )) : <td className=''>
                      <button className='text-center bg-red-500 text-white px-2 py-1 rounded-full text-sm'>
                        Not Assigned
                      </button>
                    </td>
                      } 
                   </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No lecturers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLecturers;
