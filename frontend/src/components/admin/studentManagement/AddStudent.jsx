import React, { useState } from "react";

const facultyDepartments = {
  fac_computing: [
    "Department of Software Engineering",
    "Department of Computer Science",
    "Department of Information Systems",
  ],
  fac_appliedsciences: [
    "Department of Physics",
    "Department of Chemistry",
    "Department of Biology",
  ],
  fac_medicine: [
    "Department of Clinical Medicine",
    "Department of Physiology",
    "Department of Pathology",
  ],
  fac_engineering: [
    "Department of Civil Engineering",
    "Department of Electrical Engineering",
    "Department of Mechanical Engineering",
  ],
  fac_management: [
    "Department of Marketing",
    "Department of Finance",
    "Department of HR Management",
  ],
  fac_arts: [
    "Department of Languages",
    "Department of History",
    "Department of Philosophy",
  ],
  fac_socialsciences: [
    "Department of Sociology",
    "Department of Psychology",
    "Department of Political Science",
  ],
  fac_law: [
    "Department of Criminal Law",
    "Department of Constitutional Law",
    "Department of International Law",
  ],
};

const AddStudent = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleFacultyChange = (e) => {
    const selected = e.target.value;
    setSelectedFaculty(selected);
    setDepartments(facultyDepartments[selected] || []);
  };

  const submitHandler = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold">Add Student</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-4">
        {/* Name & Reg No */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full flex flex-col gap-2">
            <label>Student Name</label>
            <input
              type="text"
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Registration Number</label>
            <input
              type="text"
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
        </div>

        {/* Email & Password */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full flex flex-col gap-2">
            <label>Add Email</label>
            <input
              type="email"
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Add Password</label>
            <input
              type="password"
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
        </div>

        {/* Faculty Select */}
        <div>
          <label>Select Faculty</label>
          <select
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded mt-2"
            value={selectedFaculty}
            onChange={handleFacultyChange}
            required
          >
            <option value="">--SELECT--</option>
            <option value="fac_computing">Faculty of Computing</option>
            <option value="fac_appliedsciences">Faculty of Applied Sciences</option>
            <option value="fac_medicine">Faculty of Medicine</option>
            <option value="fac_engineering">Faculty of Engineering</option>
            <option value="fac_management">Faculty of Management</option>
            <option value="fac_arts">Faculty of Arts</option>
            <option value="fac_socialsciences">Faculty of Social Sciences</option>
            <option value="fac_law">Faculty of Law</option>
          </select>
        </div>

        {/* Department Select - Show only if faculty is selected */}
        {selectedFaculty && (
          <div>
            <label>Select Department</label>
            <select
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded mt-2"
              required
            >
              <option value="">--SELECT DEPARTMENT--</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="mt-4 p-3 rounded bg-primaryColor text-white hover:bg-primaryColor/70 duration-300 transition-all ease-in-out">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
