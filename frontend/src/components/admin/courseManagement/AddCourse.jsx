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

const AddCourse = () => {
  const [data, setData] = useState({
    courseName: "",
    courseCode: "",
    semester: "",
    faculty: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "faculty") {
      setDepartments(facultyDepartments[value] || []);
      setData((prev) => ({
        ...prev,
        [name]: value,
        department: "", 
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    
 
  };

  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold">Add Course</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-4">
       

        {/* Course Name and Course Code */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full flex flex-col gap-2">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={data.courseName}
              onChange={handleChange}
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={data.courseCode}
              onChange={handleChange}
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
        </div>

        <div>
        <label>Select Semester</label>
          <select
            name="semester"
            value={data.semester}
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded mt-2"
            required
          >
            <option value="">--SELECT SEMESTER--</option>
            <option value="semester_1">Semester 1</option>
            <option value="semester_2">Semester 2</option>
            <option value="semester_3">Semester 3</option>
            <option value="semester_4">Semester 4</option>
            <option value="semester_5">Semester 5</option>
            <option value="semester_6">Semester 6</option>
            <option value="semester_7">Semester 7</option>
            <option value="semester_8">Semester 8</option>
          </select>
        </div>

        {/* Faculty Select */}
        <div>
          <label>Select Faculty</label>
          <select
            name="faculty"
            value={data.faculty}
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded mt-2"
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

        {/* Department Select */}
        {data.faculty && (
          <div>
            <label>Select Department</label>
            <select
              name="department"
              value={data.department}
              onChange={handleChange}
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded mt-2"
              required
            >
              <option value="">--SELECT DEPARTMENT--</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="cursor-pointer mt-4 p-3 rounded bg-primaryColor text-white hover:bg-primaryColor/70 duration-300 transition-all ease-in-out"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
