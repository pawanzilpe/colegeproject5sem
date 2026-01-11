import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    console.log("Registration Data:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">
          Registration Form
        </h2>

        {error && <p className="mb-3 text-red-500 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-3 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 mb-3 border rounded-lg"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border rounded-lg"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
