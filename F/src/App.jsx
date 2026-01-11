import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegistrationForm from "./pages/RegistertionForm";
import AdmissionForm from "./pages/AdmissionForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CollegePage from "./pages/CollegePage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admissionForm" element={<AdmissionForm />} />
        <Route path="/registrationForm" element={<RegistrationForm />} />
        <Route path="/collegePage" element={<CollegePage />} />

        <Route path="/college/:id" element={<CollegePage />} />
      </Routes>
    </>
  );
};

export default App;
