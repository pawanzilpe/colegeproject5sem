import React, { useState } from "react";
import { addCollege, updateCollege } from "../services/api";

const CollegeForm = ({ fetchColleges, editData, setEditData }) => {
  const [name, setName] = useState(editData?.name || "");
  const [city, setCity] = useState(editData?.city || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    if (image) formData.append("image", image);
    if (editData) formData.append("id", editData._id);

    try {
      if (editData) await updateCollege(formData);
      else await addCollege(formData);
      fetchColleges();
      setEditData(null);
      setName("");
      setCity("");
      setImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">{editData ? "Update" : "Add"} College</button>
      {editData && (
        <button type="button" onClick={() => setEditData(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CollegeForm;
