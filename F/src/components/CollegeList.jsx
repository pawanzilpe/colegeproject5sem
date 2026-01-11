import React, { useState, useEffect } from "react";

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // Dummy Data (Backend से आने वाला data)
  const sampleColleges = [
    {
      id: 1,
      name: "Wardha Science College",
      location: "Wardha",
      type: "Science",
    },
    {
      id: 2,
      name: "Arts & Commerce College",
      location: "Hinganghat",
      type: "Arts",
    },
    {
      id: 3,
      name: "Engineering College",
      location: "Deoli",
      type: "Engineering",
    },
    {
      id: 4,
      name: "IT & Computer Science College",
      location: "Wardha",
      type: "IT",
    },
  ];

  useEffect(() => {
    setColleges(sampleColleges);
  }, []);

  // Filter Logic
  const filteredColleges = colleges.filter((college) => {
    return (
      college.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterLocation ? college.location === filterLocation : true)
    );
  });

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-5 text-center">College List</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search college..."
          className="p-3 border rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 border rounded-lg w-full md:w-1/4"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Wardha">Wardha</option>
          <option value="Hinganghat">Hinganghat</option>
          <option value="Deoli">Deoli</option>
        </select>
      </div>

      {/* College Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">{college.name}</h3>
            <p className="mt-2 text-gray-600">📍 {college.location}</p>
            <p className="text-gray-600">🏫 {college.type} College</p>

            <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}

        {filteredColleges.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No Colleges Found
          </p>
        )}
      </div>
    </div>
  );
};

export default CollegeList;
