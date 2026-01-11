const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Add User
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
   
    });

    await user.save();
    res.json({ status: "success", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "success", users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
  try {
    const { userid } = req.body;
    await User.findByIdAndDelete(userid);
    res.json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addUser, getUsers, deleteUser };
