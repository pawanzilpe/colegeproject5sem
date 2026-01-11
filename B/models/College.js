const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  location: { type: String, trim: true }, // Google Maps URL optional
  image: { type: String, default: null }, // optional image
}, { timestamps: true }); // adds createdAt & updatedAt

module.exports = mongoose.model("College", collegeSchema);
