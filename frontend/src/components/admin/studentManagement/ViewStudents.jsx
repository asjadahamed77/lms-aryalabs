import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'

const ViewStudents = () => {
  const { students, faculties } = useContext(AppContext)
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')

  // Get unique departments for the selected faculty
  const facultyDepartments = selectedFaculty 
    ? [...new Set(
        students
          .filter(student => student.faculty === selectedFaculty.name)
          .map(student => student.department)
      )]
    : []

  // Filter students based on selections
  const filteredStudents = students.filter(student => {
    const matchesFaculty = !selectedFaculty || student.faculty === selectedFaculty.name
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment
    
    return matchesFaculty && matchesSearch && matchesDepartment
  })

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty)
    setSelectedDepartment('') // Reset department filter when faculty changes
  }

  return (
    <div className='py-12'>
      {/* Display faculties if none is selected */}
      {!selectedFaculty && (
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Select a Faculty</h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {faculties.map((fac, index) => (
              <div 
                onClick={() => handleFacultySelect(fac)} 
                key={index} 
                className='p-4 sm:p-6 lg:p-8 text-white bg-primaryColor/80 font-medium rounded-2xl cursor-pointer hover:-translate-y-2 duration-300 transition-all ease-linear hover:bg-primaryColor'
              >
                {fac.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display controls when faculty is selected */}
      {selectedFaculty && (
        <div className='mb-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
            <button 
              onClick={() => {
                setSelectedFaculty(null)
                setSearchTerm('')
                setSelectedDepartment('')
              }}
              className='px-4 py-2 bg-primaryColor/70 text-white rounded-lg hover:bg-primaryColor/80 transition-colors'
            >
              ← Back to all faculties
            </button>
            
            <h2 className='text-2xl font-semibold'>
              {selectedFaculty.name} Students
            </h2>
          </div>

          {/* Search and filter controls */}
          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-primaryColor/70 mb-1'>Search by Name</label>
              <input
                type='text'
                placeholder='Search students...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-primaryColor focus:border-primaryColor'
              />
            </div>

            {facultyDepartments.length > 0 && (
              <div className='flex-1'>
                <label className='block text-sm font-medium text-primaryColor/70 mb-1'>Filter by Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-primaryColor focus:border-primaryColor'
                >
                  <option value=''>All Departments</option>
                  {facultyDepartments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Students table */}
          <div>
            {filteredStudents.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='py-2 px-4 border-b text-start'>Name</th>
                      <th className='py-2 px-4 border-b text-start'>Reg No</th>
                      <th className='py-2 px-4 border-b text-start'>Email</th>
                      <th className='py-2 px-4 border-b text-start'>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className='hover:bg-gray-50'>
                        <td className='py-2 px-4 border-b'>{student.name}</td>
                        <td className='py-2 px-4 border-b'>{student.regNo}</td>
                        <td className='py-2 px-4 border-b'>{student.email}</td>
                        <td className='py-2 px-4 border-b'>{student.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className='text-gray-500 py-4 text-center'>
                {searchTerm || selectedDepartment
                  ? 'No students match your search criteria'
                  : `No students found in ${selectedFaculty.name}`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewStudents