import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { createCourse } from "../../../service/adminCourse";
import toast from "react-hot-toast";
import Loading from "../../common/Loading";



const AddCourse = () => {
  const [data, setData] = useState({
    courseName: "",
    courseCode: "",
    semester: "",
    faculty: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  const {loading, setLoading, faculties} = useContext(AppContext)


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

  const submitHandler = async(e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createCourse(data);
      // Reset form after submit
      setData({
        courseName: "",
        courseCode: "",
        semester: "",
        faculty: "",
        department: "",
      })
    } catch (error) {
      console.error(error);
      toast.error("Error creating student");
    }finally{
      setLoading(false);
     
    }
    
    
 
  };

  if (loading) {
    return <Loading />;
  }


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
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty.value}>
                {faculty.name}
              </option>
            ))}
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
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
