import React, { useState } from "react";
import { PiImagesSquareFill } from "react-icons/pi";

const AddAnnouncement = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Form submit
  const submitHandler = (e) => {
    e.preventDefault();

    // Example: log all data
    console.log("Announcement Data:", data);
    console.log("Selected Image:", imageFile);

    // Later you can send this data using FormData for API submission
  };

  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold">Add Announcement</h1>

      <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-4">
        {/* Announcement Name */}
        <div className="w-full flex flex-col gap-2">
          <label>Announcement Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="w-full flex flex-col gap-2">
          <label>Description</label>
          <textarea
            rows="4"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <label
          htmlFor="announcementImage"
          className="flex items-center justify-center p-8 border rounded border-slate-100 cursor-pointer"
        >
          <PiImagesSquareFill className="text-4xl text-slate-500" />
          <input
            type="file"
            id="announcementImage"
            name="announcementImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <span className="ml-2 text-slate-500">
            {imageFile ? "Change Announcement Image" : "Add Announcement Image"}
          </span>
        </label>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-slate-600 mb-2">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Announcement Preview"
              className="w-full max-w-sm rounded border border-slate-200"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer mt-4 p-3 rounded bg-primaryColor text-white hover:bg-primaryColor/70 duration-300 transition-all ease-in-out"
        >
          Add Announcement
        </button>
      </form>
    </div>
  );
};

export default AddAnnouncement;
