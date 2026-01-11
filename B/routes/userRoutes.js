const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addUser, getUsers, deleteUser } = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });
router.post("/register", addUser);
router.post("/adduser", upload.single("image"), addUser);
router.get("/view", getUsers);
router.post("/delete", deleteUser);



module.exports = router;

