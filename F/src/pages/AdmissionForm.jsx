import React, { useState } from "react";

const AdmissionForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    course: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Data:", form);

    alert("Form Submitted Successfully!");
    // 👉 यहाँ backend API से connect कर सकते हैं
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Admission Form</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter full name"
            />
          </div>

          {/* Father's Name */}
          <div>
            <label className="font-semibold">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={form.fatherName}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter father's name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter phone number"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="font-semibold">Select Course</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
            >
              <option value="">Choose a course</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.A">B.A</option>
              <option value="B.Com">B.Com</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter full address"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Admission Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
