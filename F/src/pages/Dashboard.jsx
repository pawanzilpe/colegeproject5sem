import React, { useEffect, useState } from "react";
import {
  getColleges,
  deleteCollege,
  addCollege,
  updateCollege,
  getCoursesByCollege,
} from "../services/api";
import "./Dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// ✅ Simple toast notification
const Toast = ({ message, onClose }) => (
  <div className="toast">
    {message}
    <button onClick={onClose}>X</button>
  </div>
);

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editCollege, setEditCollege] = useState(null);
  const [toast, setToast] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  // ✅ Fetch colleges
  const fetchData = async () => {
    try {
      const res = await getColleges();
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this college?")) {
      await deleteCollege(id);
      setToast("College deleted successfully!");
      fetchData();
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sorted = [...colleges].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setColleges(sorted);
  };

  const filteredColleges = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentColleges = filteredColleges.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredColleges.length / perPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewCourses = async (collegeId) => {
    try {
      const res = await getCoursesByCollege(collegeId);
      setCourses(res.data);
      setShowCourses(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = (college) => {
    setSelectedCollege(college);
  };

  return (
    <div className="dashboard-container">
      <h1>College Management Dashboard</h1>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setShowForm(true);
            setEditCollege(null);
          }}
        >
          + Add College
        </button>
      </div>

      <table className="college-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("city")}>
              City{" "}
              {sortField === "city" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("address")}>
              Address{" "}
              {sortField === "address" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("location")}>
              Location{" "}
              {sortField === "location"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentColleges.length === 0 ? (
            <tr>
              <td colSpan={5}>No colleges found.</td>
            </tr>
          ) : (
            currentColleges.map((college) => (
              <tr key={college._id}>
                <td>{college.name}</td>
                <td>{college.city}</td>
                <td>{college.address}</td>
                <td>{college.location}</td>
                <td className="action-buttons">
                  <button
                    onClick={() => {
                      setEditCollege(college);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(college._id)}
                  >
                    Delete
                  </button>
                  {/* <button onClick={() => handleViewCourses(college._id)}>
                    Courses
                  </button> */}
                  <button onClick={() => handleViewDetails(college)}>
                    Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <CollegeForm
          editCollege={editCollege}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            fetchData();
            setShowForm(false);
            setToast(editCollege ? "College updated!" : "College added!");
          }}
        />
      )}

      {/* ✅ Courses Modal */}
      {showCourses && (
        <div className="modal">
          <div className="modal-content">
            <h2>Courses</h2>
            {courses.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              <ul>
                {courses.map((c) => (
                  <li key={c._id}>{c.name}</li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowCourses(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ✅ Details Modal */}
      {selectedCollege && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCollege.name} Details</h2>
            <p>
              <strong>Name:</strong> {selectedCollege.name}
            </p>
            <p>
              <strong>City:</strong> {selectedCollege.city}
            </p>
            <p>
              <strong>Address:</strong> {selectedCollege.address}
            </p>
            {selectedCollege.location && (
              <p>
                <strong>Location:</strong>{" "}
                <a
                  href={selectedCollege.location}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Map
                </a>
              </p>
            )}
            {selectedCollege.image && (
              <img
                src={`http://localhost:5000/uploads/${selectedCollege.image}`}
                alt="college"
                width="100"
              />
            )}
            <button onClick={() => setSelectedCollege(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ CollegeForm Component
const CollegeForm = ({ editCollege, onClose, onSuccess }) => {
  const [name, setName] = useState(editCollege?.name || "");
  const [city, setCity] = useState(editCollege?.city || "");
  const [address, setAddress] = useState(editCollege?.address || "");
  const [location, setLocation] = useState(editCollege?.location || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, city, address, location };

      if (editCollege) {
        await updateCollege({ id: editCollege._id, ...payload });
      } else {
        await addCollege(payload);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error saving college!");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editCollege ? "Edit College" : "Add College"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="College Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location (Google Maps URL)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">{editCollege ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
