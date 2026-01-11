import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/registrationForm">RegistertionForm</Link>
      <Link to="/admissionForm">AdmissionForm</Link>
      <Link to="/collegePage">CollegePage</Link>
      <Link to="/">Logout</Link>
      {user ? (
        <>
          <span>Hello, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
