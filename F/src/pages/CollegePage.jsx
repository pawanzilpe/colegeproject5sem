import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CollegePage = () => {
  const { id } = useParams(); // URL से college ID लेता है
  const [college, setCollege] = useState(null);

  // API से Single College Details लाना
  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`http://localhost:3000/${id}`);
        const data = await res.json();
        setCollege(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchCollege();
  }, [id]);

  if (!college) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        wellcome to wardha district college management web software project
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{college.name}</h1>

        <p>
          <strong>Address:</strong> {college.address}
        </p>
        <p>
          <strong>City:</strong> {college.city}
        </p>
        <p>
          <strong>Email:</strong> {college.email}
        </p>
        <p>
          <strong>Contact:</strong> {college.contact}
        </p>
        <p>
          <strong>Courses:</strong> {college.courses}
        </p>

        <Link to="/collegeList" style={styles.backBtn}>
          ⬅ Back to College List
        </Link>
      </div>
    </div>
  );
};

export default CollegePage;
