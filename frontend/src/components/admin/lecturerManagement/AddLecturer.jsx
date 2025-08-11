import React, { useContext, useState } from "react";
import { createLecturer } from "../../../service/adminLecturer";
import Loading from "../../common/Loading";
import { AppContext } from "../../../context/AppContext";

const AddLecturer = () => {
  const { faculties, fetchLecturers } = useContext(AppContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "faculty") {
      // Find the selected faculty object by "value"
      const selectedFaculty = faculties.find((fac) => fac.value === value);
      setDepartments(selectedFaculty ? selectedFaculty.departments : []);
      setData((prev) => ({
        ...prev,
        [name]: value,
        department: "", // reset department
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
      setLoading(true);
      await createLecturer(data);
      fetchLecturers()
      setData({
        name: "",
        email: "",
        password: "",
        faculty: "",
        department: "",
      });
      setDepartments([]);
    } catch (error) {
      console.error("Error creating lecturer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold">Add Lecturer</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-4">
        {/* Name */}
        <div className="w-full flex flex-col gap-2">
          <label>Lecturer Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
            required
          />
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
            {faculties.map((fac, idx) => (
              <option key={idx} value={fac.value}>
                {fac.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department Select */}
        {departments.length > 0 && (
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
                <option key={idx} value={dept.department}>
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
          Add Lecturer
        </button>
      </form>
    </div>
  );
};

export default AddLecturer;
