import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { CgLoadbarDoc } from "react-icons/cg";
import toast from "react-hot-toast";
import axios from "axios";

const AddAssignment = () => {
  const { lecturerCourses } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [file, setFile] = useState(null);

  const showPopupHandler = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowPopup(false)

    
  };

  return (
    <div className="py-12">
      {/* Display all courses of the lecturer */}
      <div>
        <h1 className="font-semibold text-2xl mb-6">Select Course</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {lecturerCourses.map((course, index) => (
            <div
              onClick={() => showPopupHandler(course)}
              key={index}
              className="cursor-pointer flex items-center gap-3 text-white rounded-2xl bg-primaryColor p-6 sm:p-8 duration-300 transition-all ease-linear hover:-translate-y-2 hover:bg-primaryColor/80"
            >
              <p className="text-6xl">
                <CgLoadbarDoc />
              </p>
              <h1 className="font-medium text-xl">
                {course.courseName} - {course.courseCode}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Display Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-4 mx-4 sm:mx-0 sm:p-8 rounded-2xl w-full sm:w-[450px]">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-medium ">Create an Assignment</h1>
              <p
                onClick={() => setShowPopup(false)}
                className="text-xl font-bold rounded-full py-1 px-2 cursor-pointer"
              >
                X
              </p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Assignment Title</label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Assignment Description</label>
                <textarea
                  rows={4}
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Deadline</label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={data.deadline}
                  onChange={handleChange}
                  className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Upload Assignment File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
                />
              </div>
              <button type="submit">
                <div className="mt-2 cursor-pointer bg-primaryColor text-white p-2 rounded-lg text-center hover:bg-primaryColor/80 duration-300 transition-all ease-linear">
                  <p className="font-medium">Create Assignment</p>
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAssignment;
