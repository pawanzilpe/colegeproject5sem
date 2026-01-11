import React, { useState } from "react";

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    duration: "",
    price: "",
    description: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setCourseData({
        ...courseData,
        image: e.target.files[0],
      });
    } else {
      setCourseData({
        ...courseData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !courseData.courseName ||
      !courseData.duration ||
      !courseData.price ||
      !courseData.description
    ) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setSuccess("Course added successfully!");

    console.log("Course Data:", courseData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Add New Course</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-3">{success}</p>
        )}

        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 3 Months)"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Course Price (₹)"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Course Description"
          className="w-full p-3 border rounded-lg mb-3"
          rows="3"
          onChange={handleChange}
        ></textarea>

        <input
          type="file"
          name="image"
          className="w-full p-3 border rounded-lg mb-3 bg-gray-50"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
