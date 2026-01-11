const College = require("../models/College");

// ✅ Add College
const addCollege = async (req, res) => {
  try {
    const { name, city, address, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const college = new College({ name, city, address, location, image });
    await college.save();
    res.json(college);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Colleges
const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update College
const updateCollege = async (req, res) => {
  try {
    const { id, name, city, address, location } = req.body;
    const updateData = { name, city, address, location };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const college = await College.findByIdAndUpdate(id, updateData, { new: true });
    res.json(college);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete College
const deleteCollege = async (req, res) => {
  try {
    const { id } = req.body;
    await College.findByIdAndDelete(id);
    res.json({ message: "College deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCollege, getColleges, updateCollege, deleteCollege };
