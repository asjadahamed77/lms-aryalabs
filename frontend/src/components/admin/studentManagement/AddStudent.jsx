import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const AddStudent = () => {
  const { faculties } = useContext(AppContext);

  const [data, setData] = useState({
    name: "",
    regNo: "",
    email: "",
    password: "",
    faculty: "",
    department: "",
    createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "faculty") {
      const selectedFaculty = faculties.find((f) => f.value === value);
      setDepartments(selectedFaculty ? selectedFaculty.departments : []);
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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      alert("Student added successfully!");

      // Reset form after submit
      setData({
        name: "",
        regNo: "",
        email: "",
        password: "",
        faculty: "",
        department: "",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
      setDepartments([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add student");
    }
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
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Registration Number</label>
            <input
              type="text"
              name="regNo"
              value={data.regNo}
              onChange={handleChange}
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
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Add Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
              required
            />
          </div>
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
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty.value}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department Select - Only shown when a faculty is selected */}
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
              {departments.map((dept, index) => (
                <option key={index} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="cursor-pointer mt-4 p-3 rounded bg-primaryColor text-white hover:bg-primaryColor/70 duration-300 transition-all ease-in-out"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;