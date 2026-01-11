const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addCollege, getColleges, updateCollege, deleteCollege } = require("../controllers/collegeController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });

router.post("/add", upload.single("image"), addCollege);
router.get("/view", getColleges);
router.post("/update", upload.single("image"), updateCollege);
router.post("/delete", deleteCollege);
// router.get("/college/:id/courses", collegeController.getCoursesByCollege);

module.exports = router;
