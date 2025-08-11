import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { createStudent } from "../../../service/adminStudent";
import Loading from "../../common/Loading";
import toast from "react-hot-toast";

const AddStudent = () => {
  const { faculties, loading, setLoading, fetchStudents } = useContext(AppContext);

  const [data, setData] = useState({
    name: "",
    regNo: "",
    email: "",
    password: "",
    batch: "",
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

      setLoading(true);
      await createStudent(data);
      fetchStudents()

      // Reset form after submit
      setData({
        name: "",
        regNo: "",
        email: "",
        password: "",
        batch: "",
        faculty: "",
        department: "",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
      setDepartments([]);
    } catch (err) {
      console.error(err);
      toast.error("Error creating student");
    }finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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

        {/* Batch */}
        <div>
        <label>Select Batch</label>
        <select name="batch" value={data.batch} onChange={handleChange}  className="w-full p-2 border border-slate-200 bg-slate-50 rounded mt-2"
            required>
          <option value="">--SELECT BATCH--</option>
          <option value="2020/2021 Batch">2020/2021 Batch</option>
          <option value="2021/2022 Batch">2021/2022 Batch</option>
          <option value="2022/2023 Batch">2022/2023 Batch</option>
          <option value="2023/2024 Batch">2023/2024 Batch</option>
          <option value="2024/2025 Batch">2024/2025 Batch</option>
          <option value="2025/2026 Batch">2025/2026 Batch</option>
          <option value="2026/2027 Batch">2026/2027 Batch</option>
          <option value="2027/2028 Batch">2027/2028 Batch</option>
          <option value="2028/2029 Batch">2028/2029 Batch</option>
          <option value="2029/2030 Batch">2029/2030 Batch</option>
          <option value="2030/2031 Batch">2030/2031 Batch</option>
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