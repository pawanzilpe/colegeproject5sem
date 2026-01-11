import axios from "axios";

const API_URL = "http://localhost:3000"; // backend server URL


// ✅ Register
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/user/register`, userData);
};

// ✅ Auth
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

// ✅ Colleges
export const getColleges = () => axios.get(`${API_URL}/college/view`);
export const addCollege = (formData) =>
  axios.post(`${API_URL}/college/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateCollege = (formData) =>
  axios.post(`${API_URL}/college/update`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteCollege = (id) =>
  axios.post(`${API_URL}/college/delete`, { id });

// ✅ Courses by College
export const getCoursesByCollege = (collegeId) =>
  axios.get(`${API_URL}/college/${collegeId}/courses`);
